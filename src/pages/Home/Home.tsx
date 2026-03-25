import { startTransition, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { dataService } from '@api';
import type { Event } from '@types';
import { useCurrentTime, useProgressiveImage, useScrollAnimation } from '@hooks';
import { HOME_PAGE_SPEAKER_LOGOS } from '@constants';
import { Footer, LogoGallery, NewsletterSignup, FloatingPopup } from '@components';
import {
  getEventThumbnailUrl,
  getNextUpcomingEvent,
  formatEventDateOnly,
  formatEventTimeOnly,
  getCurrentSiteDateKey,
} from '@utils';

import './Home.css';

const LAST_DISMISSED_DATE_STORAGE_KEY = 'homeNextEventPopup:lastDismissedDate';
const HERO_GALLERY_IMAGES = [
  '/home-gallery/sjba-gallery-1.JPG',
  '/home-gallery/sjba-gallery-2.JPG',
  '/home-gallery/sjba-gallery-3.JPG',
  '/home-gallery/sjba-gallery-4.JPG',
] as const;
const HERO_GALLERY_PLACEHOLDER = '/home-gallery/sjba-gallery-1-placeholder.jpg';
const HOME_PROOF_POINTS = [
  {
    label: 'Speaker Events',
    title: 'Leaders in finance, consulting, and technology.',
    copy: "SJBA's guest speakers span across finance, consulting, investing, and technology, giving members direct access to industry leaders.",
  },
  {
    label: 'Career Building',
    title: 'Jumpstart your career.',
    copy: 'Explore career paths, connect with mentors, build skills, and unlock opportunities. Our network spans top firms across the business world.',
  },
  {
    label: 'Professional Network',
    title: 'A Jewish community open to all.',
    copy: 'Our community is grounded in shared values and mutual support, and is open to all interested NYU students regardless of background or identity.',
  },
] as const;

const HomeHero = () => {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const speakersAnimation = useScrollAnimation({ threshold: 0.3 });

  const [currentImage, setCurrentImage] = useState(1);
  const [loadedGalleryImages, setLoadedGalleryImages] = useState<number[]>([1, 2]);
  const firstHeroImageSrc = HERO_GALLERY_IMAGES[0];
  const { currentSrc: progressiveHeroImageSrc, isFullLoaded: isHeroImageLoaded } =
    useProgressiveImage(HERO_GALLERY_PLACEHOLDER, firstHeroImageSrc);

  useEffect(() => {
    const interval = setInterval(() => {
      startTransition(() => {
        setCurrentImage((prev) => (prev >= 4 ? 1 : prev + 1));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (imageNumber: number) => {
    setCurrentImage(imageNumber);
  };

  useEffect(() => {
    startTransition(() => {
      setLoadedGalleryImages((previous) =>
        previous.includes(currentImage) ? previous : [...previous, currentImage]
      );
    });
  }, [currentImage]);

  return (
    <div
      ref={heroAnimation.elementRef}
      className={`hero-section slide-up ${heroAnimation.isVisible ? 'visible' : ''}`}
    >
      <div className="rotating-gallery-background">
        <div className="gallery-image-container">
          {HERO_GALLERY_IMAGES.map((imageSrc, index) => {
            const imageNumber = index + 1;
            const shouldLoadImage = loadedGalleryImages.includes(imageNumber);
            const isActiveImage = currentImage === imageNumber;
            const isPriorityImage = imageNumber === 1;
            const displaySrc = isPriorityImage
              ? (progressiveHeroImageSrc ?? HERO_GALLERY_PLACEHOLDER)
              : shouldLoadImage
                ? imageSrc
                : undefined;

            return (
              <div
                key={imageSrc}
                className={`gallery-image ${isActiveImage ? 'active' : ''}`}
                data-image={imageNumber}
              >
                {displaySrc ? (
                  <img
                    src={displaySrc}
                    alt=""
                    loading={isPriorityImage ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isPriorityImage ? 'high' : 'low'}
                    className={imageNumber === 1 && !isHeroImageLoaded ? 'is-placeholder' : ''}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="gallery-overlay"></div>
      </div>

      <div className="hero-shell">
        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="main-title">
              <span className="title-line-1">Jewish community</span>
              <span className="title-connector">for the next generation at</span>
              <span className="title-line-2">NYU Stern</span>
            </h1>
            <p className="hero-description">
              SJBA fosters a community of ambitious students, distinguished speakers, and a
              professional network built on shared values.
            </p>

            <div
              ref={speakersAnimation.elementRef}
              className={`link-section scale-in ${speakersAnimation.isVisible ? 'visible' : ''}`}
            >
              <Link to="/events" className="speakers-link">
                <span>Explore Speakers</span>
                <img src="/icons/arrow-top-right.png" alt="Arrow" className="speakers-link-arrow" />
              </Link>
              <Link to="/our-mission" className="our-mission-link">
                <span>The SJBA Mission</span>
                <img
                  src="/icons/arrow-top-right.png"
                  alt="Arrow"
                  className="our-mission-link-arrow"
                />
              </Link>
            </div>

            <div className="gallery-navigation" aria-label="Hero gallery navigation">
              {HERO_GALLERY_IMAGES.map((imageSrc, index) => {
                const imageNumber = index + 1;

                return (
                  <button
                    key={imageSrc}
                    type="button"
                    className={`nav-dot ${currentImage === imageNumber ? 'active' : ''}`}
                    data-target={imageNumber}
                    onClick={() => handleDotClick(imageNumber)}
                    aria-label={`Show hero image ${imageNumber}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="hero-gallery-ribbon">
          <LogoGallery logos={HOME_PAGE_SPEAKER_LOGOS} variant="hero-ribbon" />
        </div>
      </div>
    </div>
  );
};

const HomeNextEventPopup = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [lastDismissedDate, setLastDismissedDate] = useState<string | null>(null);
  const [isDismissalStateReady, setIsDismissalStateReady] = useState(false);
  const now = useCurrentTime();

  const nextEvent = useMemo(() => getNextUpcomingEvent(events, now), [events, now]);
  const nextEventThumbnail = useMemo(() => {
    if (!nextEvent?.flyerFile) return undefined;
    return getEventThumbnailUrl(nextEvent.flyerFile);
  }, [nextEvent]);
  const currentDateKey = useMemo(() => getCurrentSiteDateKey(now), [now]);
  const nextEventDateLabel = useMemo(() => {
    if (!nextEvent) return '';
    return formatEventDateOnly(nextEvent.startTime);
  }, [nextEvent]);
  const nextEventTimeLabel = useMemo(() => {
    if (!nextEvent) return '';
    return formatEventTimeOnly(nextEvent.startTime, nextEvent.endTime);
  }, [nextEvent]);

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

  useEffect(() => {
    let isCancelled = false;

    const fetchEvents = async () => {
      try {
        const { events: fetchedEvents } = await dataService.events.getAll({ limit: 100 });
        if (!isCancelled) {
          startTransition(() => {
            setEvents(fetchedEvents);
          });
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
  );
};

export const Home = () => {
  return (
    <div className="page-container">
      <HomeHero />

      <section className="home-section proof-section" aria-label="SJBA professional value">
        {HOME_PROOF_POINTS.map((item) => (
          <article key={item.label} className="proof-item">
            <span className="proof-label">{item.label}</span>
            <h2 className="proof-title">{item.title}</h2>
            <p className="proof-copy">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="home-section split-content-container">
        <div className="content-section">
          <div className="text-container">
            <h2 className="section-title">
              A professional Jewish community with real career gravity.
            </h2>
            <p className="section-lead">
              SJBA sits at the intersection of campus life and professional formation, giving Stern
              students a place to think seriously about business, leadership, and community at the
              same time.
            </p>

            <div className="section-content">
              <p>
                Our programming is designed to feel substantive rather than symbolic. Members hear
                directly from accomplished operators, investors, founders, and advisors, then carry
                those conversations into a network of peers who are equally committed to growth.
              </p>

              <p>
                That combination matters at Stern. Students want access, but they also want context:
                how careers unfold, how decisions are made, and how values can remain part of the
                equation. SJBA creates a home for both the ambition and the belonging.
              </p>
            </div>
          </div>
        </div>

        <NewsletterSignup />
      </section>

      <HomeNextEventPopup />
      <Footer />
    </div>
  );
};
