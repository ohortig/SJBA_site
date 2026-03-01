import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Footer, LoadingSpinner, ErrorDisplay } from '@components';
import { useScrollAnimation } from '@hooks';
import { dataService } from '@api';
import { EVENT_FLYERS_BUCKET } from '@constants';
import {
  semesterSortKey,
  semesterLabel,
  formatEventDateOnly,
  formatEventTimeOnly,
  getEventThumbnailUrl,
} from '@utils';
import type { Event } from '@types';
import { MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './Events.css';

// Section type for Upcoming/Past grouping
type EventSection = 'upcoming' | 'past';

export const Events = () => {
  const shouldReduceMotion = useReducedMotion();
  const { hash } = useLocation();
  const headerAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });
  const eventsAnimation = useScrollAnimation({
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px',
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSemester, setActiveSemester] = useState<string | null>(null);
  const [forceVisible, setForceVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [modalFlyer, setModalFlyer] = useState<{ src: string; title: string } | null>(null);
  const [linkedEventId, setLinkedEventId] = useState<string | null>(null);
  const preloadedImagesRef = useRef<Set<string>>(new Set());

  // Refs for event cards to track which semester is in view
  const eventCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const footerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  // Refs for Upcoming/Past sections for scroll navigation
  const sectionRefs = useRef<Record<EventSection, HTMLDivElement | null>>({
    upcoming: null,
    past: null,
  });

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { events: fetchedEvents } = await dataService.events.getAll({
        limit: 100,
      });
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      let errorMessage = 'Failed to load events. Please try again later.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch events data
  useEffect(() => {
    void fetchEvents();
  }, [fetchEvents]);

  // Fallback mechanism for mobile - ensure animations trigger after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Preload full-resolution event flyers in the background
  // so they're already cached when the modal opens
  useEffect(() => {
    if (events.length === 0) return;

    const preloadImages = events
      .filter((event) => event.flyerFile && !imageErrors.has(event.id))
      .map((event) => {
        const img = new Image();
        const fullSrc = `${EVENT_FLYERS_BUCKET}${event.flyerFile}`;
        img.src = fullSrc;
        img.onload = () => {
          preloadedImagesRef.current.add(fullSrc);
        };
        return img;
      });

    return () => {
      preloadImages.forEach((img) => {
        img.onload = null;
      });
    };
  }, [events, imageErrors]);

  // Track scroll position to update active semester based on visible events and footer proximity
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 300; // Offset for header

        // Find which event card is currently in view and get its semester
        let foundSemester: string | null = null;
        let closestDistance = Infinity;
        eventCardRefs.current.forEach((element, eventId) => {
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight + 100) {
              const distance = Math.abs(scrollPosition - offsetTop);
              if (distance < closestDistance) {
                const event = events.find((e) => e.id === eventId);
                if (event) {
                  foundSemester = event.semester;
                  closestDistance = distance;
                }
              }
            }
          }
        });

        if (foundSemester) {
          setActiveSemester(foundSemester);
        }

        // Check if we're near the footer and calculate offset - direct DOM manipulation
        if (footerRef.current) {
          const footerTop = footerRef.current.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (footerTop < windowHeight) {
            const offset = windowHeight - footerTop;
            // Update sidebar position directly
            if (sidebarRef.current) {
              sidebarRef.current.style.transform = `translateY(calc(-50% - ${offset}px))`;
            }
          } else {
            // Reset to default positions
            if (sidebarRef.current) {
              sidebarRef.current.style.transform = 'translateY(-50%)';
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [events]);

  // Navigate to and highlight linked event cards when arriving via hash
  useEffect(() => {
    if (!hash.startsWith('#event-') || isLoading || error || events.length === 0) return;

    let targetEventId = hash.replace('#event-', '');
    try {
      targetEventId = decodeURIComponent(targetEventId);
    } catch {
      // Fall back to raw hash fragment if decoding fails.
    }
    if (!targetEventId) return;

    const targetElement =
      eventCardRefs.current.get(targetEventId) ??
      (document.getElementById(`event-${targetEventId}`) as HTMLDivElement | null);

    if (!targetElement) return;

    // Dynamically calculate offset based on actual header height to handle mobile/desktop differences
    const headerHeight = document.querySelector('header')?.clientHeight || 80;
    const offset = headerHeight + 40; // Include 40px of breathing room

    const top = Math.max(targetElement.getBoundingClientRect().top + window.scrollY - offset, 0);
    window.scrollTo({ top, behavior: 'smooth' });

    setLinkedEventId(targetEventId);
    const timeout = window.setTimeout(() => {
      setLinkedEventId((currentId) => (currentId === targetEventId ? null : currentId));
    }, 2500);

    return () => window.clearTimeout(timeout);
  }, [hash, isLoading, error, events]);

  // Group events by Upcoming/Past
  const eventsBySection = useMemo(() => {
    const now = new Date();
    const grouped: Record<EventSection, Event[]> = {
      upcoming: [],
      past: [],
    };

    // Sort events by start time
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    sortedEvents.forEach((event) => {
      const eventDate = new Date(event.startTime);
      if (eventDate >= now) {
        grouped.upcoming.push(event);
      } else {
        // Sort past events most recent first
        grouped.past.unshift(event);
      }
    });

    return grouped;
  }, [events]);

  // Derive available semesters from events
  const availableSemesters = useMemo(() => {
    const semesterSet = new Set<string>();
    events.forEach((event) => {
      if (event.semester) semesterSet.add(event.semester);
    });
    // Sort semesters newest-first
    return Array.from(semesterSet).sort((a, b) => semesterSortKey(b) - semesterSortKey(a));
  }, [events]);

  const handleImageError = (eventId: string) => {
    setImageErrors((prev) => new Set(prev).add(eventId));
  };

  const shouldShowPlaceholder = (event: Event) => {
    return !event.flyerFile || imageErrors.has(event.id);
  };

  const scrollToSemester = useCallback(
    (semester: string) => {
      // Find the event card with the smallest offsetTop that belongs to this semester
      let targetElement: HTMLDivElement | undefined = undefined;
      let bestTop = Infinity;

      eventCardRefs.current.forEach((element, eventId) => {
        const event = events.find((e) => e.id === eventId);
        if (event && event.semester === semester && element) {
          const top = element.offsetTop;
          if (top < bestTop) {
            bestTop = top;
            targetElement = element;
          }
        }
      });

      if (targetElement) {
        // Dynamically calculate offset based on actual header height to handle mobile/desktop differences
        const headerHeight = document.querySelector('header')?.clientHeight || 80;
        const offset = headerHeight + 40; // Include 40px of breathing room

        const top = (targetElement as HTMLDivElement).offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [events]
  );

  // Helper to set event card ref
  const setEventCardRef = (eventId: string) => (el: HTMLDivElement | null) => {
    if (el) {
      eventCardRefs.current.set(eventId, el);
    } else {
      eventCardRefs.current.delete(eventId);
    }
  };

  // Render an event card
  const renderEventCard = (event: Event) => {
    const isPastEvent = new Date(event.startTime) < new Date();

    return (
      <motion.div
        key={event.id}
        id={`event-${event.id}`}
        ref={setEventCardRef(event.id)}
        className={`event-card stagger-item ${linkedEventId === event.id ? 'event-card--linked-highlight' : ''}`}
        animate={
          linkedEventId === event.id && !shouldReduceMotion
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(76, 13, 127, 0), 0 4px 12px rgba(76, 13, 127, 0.1)',
                  '0 0 0 6px rgba(76, 13, 127, 0.2), 0 12px 30px rgba(76, 13, 127, 0.24)',
                  '0 0 0 3px rgba(76, 13, 127, 0.15), 0 10px 28px rgba(76, 13, 127, 0.22)',
                ],
              }
            : undefined
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : linkedEventId === event.id
              ? { duration: 2.4, ease: 'easeInOut' }
              : MOTION_TRANSITION_FAST
        }
        whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      >
        <div
          className={`event-flyer ${!shouldShowPlaceholder(event) ? 'has-image' : ''}`}
          onClick={(e) => {
            if (!shouldShowPlaceholder(event)) {
              e.stopPropagation();
              setModalFlyer({
                src: `${EVENT_FLYERS_BUCKET}${event.flyerFile}`,
                title: event.title,
              });
            }
          }}
        >
          {shouldShowPlaceholder(event) ? (
            <div className="flyer-placeholder">
              <img
                src="/icons/profile-round.svg"
                alt="Event placeholder"
                className="flyer-placeholder-icon"
              />
            </div>
          ) : (
            <img
              src={getEventThumbnailUrl(event.flyerFile)}
              alt={`${event.title} flyer`}
              className="event-flyer-image"
              onError={() => handleImageError(event.id)}
            />
          )}
        </div>
        <div className="event-info">
          <h3 className="event-title">{event.title}</h3>
          {event.company && (
            <p
              className="event-company"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <img src="/icons/briefcase.svg" alt="" className="event-icon" />
              <span>{event.company}</span>
            </p>
          )}
          <p
            className="event-datetime"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <img src="/icons/calendar.svg" alt="" className="event-icon" />
            <span>{formatEventDateOnly(event.startTime)}</span>
          </p>
          <p
            className="event-datetime"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <img src="/icons/clock.svg" alt="" className="event-icon" />
            <span>{formatEventTimeOnly(event.startTime, event.endTime)}</span>
          </p>
          {event.location && (
            <p
              className="event-location"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <img src="/icons/location-pin.svg" alt="" className="event-icon" />
              <span>{event.location}</span>
            </p>
          )}
          {event.description && (
            <p className="event-description">
              {event.description
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
            </p>
          )}
          {event.rsvpLink &&
            (isPastEvent ? (
              <span className="event-rsvp-btn disabled">RSVP Closed</span>
            ) : (
              <a
                href={event.rsvpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="event-rsvp-btn"
                onClick={(e) => e.stopPropagation()}
              >
                RSVP
              </a>
            ))}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="page-container events-page-layout">
        <div className="events-main-content">
          <div
            ref={headerAnimation.elementRef}
            className={`events-header slide-up ${headerAnimation.isVisible ? 'visible' : ''}`}
          >
            <h1 className="events-title">Events</h1>
          </div>

          <div
            ref={eventsAnimation.elementRef}
            className={`events-section slide-up ${eventsAnimation.isVisible || forceVisible ? 'visible' : ''}`}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay error={error} onRetry={() => void fetchEvents()} />
            ) : events.length === 0 ? (
              <div className="no-events-message">
                <p>No events scheduled yet.</p>
              </div>
            ) : (
              <div className="events-by-semester">
                {/* Upcoming Events Section */}
                {eventsBySection.upcoming.length > 0 && (
                  <div
                    ref={(el) => {
                      sectionRefs.current.upcoming = el;
                    }}
                    className="semester-section"
                    id="section-upcoming"
                  >
                    <h2 className="semester-heading">Upcoming</h2>
                    <div
                      className={`events-grid stagger-children ${eventsAnimation.isVisible || forceVisible ? 'visible' : ''}`}
                    >
                      {eventsBySection.upcoming.map(renderEventCard)}
                    </div>
                  </div>
                )}

                {/* Past Events Section */}
                {eventsBySection.past.length > 0 && (
                  <div
                    ref={(el) => {
                      sectionRefs.current.past = el;
                    }}
                    className="semester-section"
                    id="section-past"
                  >
                    <h2 className="semester-heading">Past</h2>
                    <div
                      className={`events-grid stagger-children ${eventsAnimation.isVisible || forceVisible ? 'visible' : ''}`}
                    >
                      {eventsBySection.past.map(renderEventCard)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Semester Navigation */}
        {!isLoading && !error && availableSemesters.length > 0 && (
          <aside ref={sidebarRef} className="semester-sidebar">
            <nav className="semester-nav">
              <h3 className="semester-nav-title">Semester</h3>
              {availableSemesters.map((semester) => (
                <button
                  key={semester}
                  className={`semester-nav-item ${activeSemester === semester ? 'active' : ''}`}
                  onClick={() => scrollToSemester(semester)}
                >
                  {semesterLabel(semester)}
                </button>
              ))}
            </nav>
          </aside>
        )}
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>

      {/* Flyer Modal */}
      <AnimatePresence>
        {modalFlyer && (
          <motion.div
            className="flyer-modal-overlay"
            onClick={() => setModalFlyer(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              className="flyer-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            >
              <button
                className="flyer-modal-close"
                onClick={() => setModalFlyer(null)}
                aria-label="Close modal"
              >
                ×
              </button>
              <img
                src={modalFlyer.src}
                alt={`${modalFlyer.title} flyer`}
                className="flyer-modal-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
