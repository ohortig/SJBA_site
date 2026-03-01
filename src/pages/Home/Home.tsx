import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

import { dataService } from '@api';
import type { Event } from '@types';
import { useScrollAnimation } from '@hooks';
import { HOME_PAGE_SPEAKER_LOGOS } from '@constants';
import { Footer, LogoGallery, NewsletterSignup, FloatingPopup } from '@components';
import {
  getEventThumbnailUrl,
  getNextUpcomingEvent,
  formatEventDateOnly,
  formatEventTimeOnly,
  getCurrentLocalDateKey,
} from '@utils';

import { MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './Home.css';

const LAST_DISMISSED_DATE_STORAGE_KEY = 'homeNextEventPopup:lastDismissedDate';

const MotionLink = motion.create(Link);

export const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });

  // Gallery rotation state
  const [currentImage, setCurrentImage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [lastDismissedDate, setLastDismissedDate] = useState<string | null>(null);
  const [isDismissalStateReady, setIsDismissalStateReady] = useState(false);

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle navigation dot clicks
  const handleDotClick = (imageNumber: number) => {
    setCurrentImage(imageNumber);
  };

  const nextEvent = useMemo(() => getNextUpcomingEvent(events), [events]);

  const nextEventThumbnail = useMemo(() => {
    if (!nextEvent?.flyerFile) return undefined;
    return getEventThumbnailUrl(nextEvent.flyerFile);
  }, [nextEvent]);

  const currentDateKey = getCurrentLocalDateKey();

  const nextEventDateLabel = useMemo(() => {
    if (!nextEvent) return '';
    return formatEventDateOnly(nextEvent.startTime);
  }, [nextEvent]);

  const nextEventTimeLabel = useMemo(() => {
    if (!nextEvent) return '';
    return formatEventTimeOnly(nextEvent.startTime, nextEvent.endTime);
  }, [nextEvent]);

  // Read previously dismissed next-event popup state from localStorage
  useEffect(() => {
    try {
      const persistedLastDismissedDate = localStorage.getItem(LAST_DISMISSED_DATE_STORAGE_KEY);
      setLastDismissedDate(persistedLastDismissedDate);
    } catch (error) {
      console.error('Unable to access popup dismissal state:', error);
    } finally {
      setIsDismissalStateReady(true);
    }
  }, []);

  // Fetch events data to determine next upcoming event for popup
  useEffect(() => {
    let isCancelled = false;

    const fetchEvents = async () => {
      try {
        const { events: fetchedEvents } = await dataService.events.getAll({ limit: 100 });
        if (!isCancelled) {
          setEvents(fetchedEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events for home popup:', error);
      }
    };

    void fetchEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handlePopupClose = () => {
    setLastDismissedDate(currentDateKey);
    try {
      localStorage.setItem(LAST_DISMISSED_DATE_STORAGE_KEY, currentDateKey);
    } catch (error) {
      console.error('Unable to persist popup dismissal state:', error);
    }
  };

  return (
    <div className="page-container">
      <div
        ref={heroAnimation.elementRef}
        className={`hero-section slide-up ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        {/* Rotating Gallery Background */}
        <div className="rotating-gallery-background">
          <div className="gallery-image-container">
            {[
              '/home-gallery/sjba-gallery-1.JPG',
              '/home-gallery/sjba-gallery-2.JPG',
              '/home-gallery/sjba-gallery-3.JPG',
              '/home-gallery/sjba-gallery-4.JPG',
            ].map((src, index) => {
              const imageNumber = index + 1;

              return (
                <motion.div
                  key={src}
                  className="gallery-image"
                  data-image={imageNumber}
                  animate={{ opacity: currentImage === imageNumber ? 1 : 0 }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 1.5, ease: [0.4, 0, 0.2, 1] }
                  }
                >
                  <img src={src} />
                </motion.div>
              );
            })}
          </div>
          <div className="gallery-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          {/* Main Title */}
          <h1 className="main-title">
            <motion.span
              className="title-line-1"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
            >
              Building Jewish Community
            </motion.span>
            <motion.span
              className="title-connector"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION_FAST, delay: 0.1 }
              }
            >
              at
            </motion.span>
            <motion.span
              className="title-line-2"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION_FAST, delay: 0.2 }
              }
            >
              NYU Stern
            </motion.span>
          </h1>
        </div>

        <div
          ref={speakersAnimation.elementRef}
          className={`link-section scale-in ${speakersAnimation.isVisible ? 'visible' : ''}`}
        >
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION_FAST, delay: 0.4 }
            }
          >
            <MotionLink
              to="/our-mission"
              className="our-mission-link"
              whileHover={shouldReduceMotion ? undefined : { y: -2, x: 2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              <span>Our Mission</span>
              <img
                src="/icons/arrow-top-right.png"
                alt="Arrow"
                className="our-mission-link-arrow"
              />
            </MotionLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION_FAST, delay: 0.4 }
            }
          >
            <MotionLink
              to="/events"
              className="speakers-link"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              <span>Our Speakers</span>
              <img src="/icons/arrow-top-right.png" alt="Arrow" className="speakers-link-arrow" />
            </MotionLink>
          </motion.div>
        </div>

        {/* Gallery Navigation Dots */}
        <motion.div
          className="gallery-navigation"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION_FAST, delay: 0.7 }
          }
        >
          {[1, 2, 3, 4].map((imageNumber) => (
            <motion.button
              key={imageNumber}
              type="button"
              className={`nav-dot ${currentImage === imageNumber ? 'active' : ''}`}
              data-target={imageNumber}
              onClick={() => handleDotClick(imageNumber)}
              animate={{ scale: currentImage === imageNumber ? 1.4 : 1 }}
              whileHover={
                shouldReduceMotion || currentImage === imageNumber ? undefined : { scale: 1.2 }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
            />
          ))}
        </motion.div>
      </div>

      <LogoGallery logos={HOME_PAGE_SPEAKER_LOGOS} />

      <div className="section-divider"></div>

      <div className="split-content-container">
        <div className="content-section">
          <div className="text-container">
            <h2 className="section-title">The Jewish impact on the business world</h2>

            <div className="section-content">
              <p>
                The Jewish community has played a pivotal role in shaping modern business and
                finance. From pioneering investment banking to revolutionary entrepreneurship,
                Jewish professionals have left an indelible mark on industries worldwide. At SJBA,
                we celebrate this rich heritage while building the next generation of Jewish
                business leaders.
              </p>

              <p>
                Our organization provides a platform for networking, mentorship, and professional
                development within NYU's vibrant Jewish community. Through exclusive events, speaker
                series, and industry connections, we help members understand their cultural legacy
                while preparing them for successful careers in finance, consulting, technology, and
                beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <NewsletterSignup />
      </div>

      <FloatingPopup
        isOpen={Boolean(isDismissalStateReady && nextEvent && lastDismissedDate !== currentDateKey)}
        onClose={handlePopupClose}
        eyebrow="Upcoming Event"
        title={nextEvent?.title ?? ''}
        subtitle={nextEvent?.company ?? undefined}
        thumbnailSrc={nextEventThumbnail}
        thumbnailAlt={nextEvent ? `${nextEvent.title} flyer thumbnail` : 'Event flyer thumbnail'}
        ariaLabel="Next upcoming event"
      >
        {nextEvent && (
          <div className="home-next-event-popup-meta">
            <div className="home-next-event-popup-details">
              <p className="home-next-event-popup-row">
                <img src="/icons/calendar.svg" alt="" className="home-next-event-popup-icon" />
                <span className="home-next-event-popup-value">{nextEventDateLabel}</span>
              </p>
              <p className="home-next-event-popup-row">
                <img src="/icons/clock.svg" alt="" className="home-next-event-popup-icon" />
                <span className="home-next-event-popup-value">{nextEventTimeLabel}</span>
              </p>
              <p className="home-next-event-popup-row">
                <img src="/icons/location-pin.svg" alt="" className="home-next-event-popup-icon" />
                <span className="home-next-event-popup-value">
                  {nextEvent.location ?? 'Location TBA'}
                </span>
              </p>
            </div>
            <Link
              to={`/events#event-${nextEvent.id}`}
              className="home-next-event-popup-cta home-next-event-popup-cta-inline"
              onClick={handlePopupClose}
            >
              <span>View Details</span>
              <img
                src="/icons/arrow-top-right.png"
                alt=""
                className="home-next-event-popup-cta-arrow"
              />
            </Link>
          </div>
        )}
      </FloatingPopup>

      <Footer />
    </div>
  );
};
