import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorDisplay, Footer, LoadingSpinner, SubpageHero } from '@components';
import { dataService } from '@api';
import { useCurrentTime, useScrollAnimation } from '@hooks';
import { EVENT_FLYERS_BUCKET } from '@constants';
import {
  compareEventStarts,
  formatEventDateOnly,
  formatEventTimeOnly,
  getEventThumbnailUrl,
  isEventPast,
  semesterLabel,
  semesterSortKey,
} from '@utils';
import type { Event } from '@types';
import './Events.css';

const UPCOMING_EVENTS_LIMIT = 3;
const ARCHIVE_PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 260;
const DEFAULT_IMAGE_WIDTH = 960;
const DEFAULT_IMAGE_HEIGHT = 1280;

interface FlyerModalState {
  src: string;
  title: string;
}

interface EventFlyerProps {
  event: Event;
  imageErrors: Set<string>;
  onImageError: (eventId: string) => void;
  onOpen: (event: Event) => void;
  onPreload: (event: Event) => void;
  registerFlyerButton: (eventId: string, element: HTMLButtonElement | null) => void;
}

interface EventCardProps extends EventFlyerProps {
  event: Event;
  now: Date;
  variant: 'upcoming' | 'archive';
}

interface ArchiveCacheEntry {
  pages: Map<number, Event[]>;
  totalPages: number;
  total: number;
}

const parsePositiveInteger = (value: string | null, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getEventFlyerSrc = (flyerFile: string | null): string => {
  if (!flyerFile) return '';
  return `${EVENT_FLYERS_BUCKET}${flyerFile}`;
};

const mergeUniqueEvents = (eventPages: Event[][]): Event[] => {
  const seenIds = new Set<string>();
  const merged: Event[] = [];

  eventPages.flat().forEach((event) => {
    if (seenIds.has(event.id)) {
      return;
    }

    seenIds.add(event.id);
    merged.push(event);
  });

  return merged;
};

const normalizeEventDescription = (description: string | null): string => {
  if (!description) return '';
  return description.replace(/\\n/g, '\n').trim();
};

const getArchiveCacheKey = (search: string, semester: string): string =>
  `${search.toLowerCase()}::${semester}`;

const getLoadedArchivePages = (entry: ArchiveCacheEntry): number => {
  let loadedPages = 0;

  for (let page = 1; page <= entry.totalPages; page += 1) {
    if (!entry.pages.has(page)) {
      break;
    }

    loadedPages += 1;
  }

  return loadedPages;
};

const EventFlyer = ({
  event,
  imageErrors,
  onImageError,
  onOpen,
  onPreload,
  registerFlyerButton,
}: EventFlyerProps) => {
  const hasImage = Boolean(event.flyerFile) && !imageErrors.has(event.id);
  const thumbnailSrc = getEventThumbnailUrl(event.flyerFile);

  if (!hasImage) {
    return (
      <div className="event-card__flyer event-card__flyer--placeholder" aria-hidden="true">
        <div className="event-card__flyer-placeholder">
          <img
            src="/icons/profile-round.svg"
            alt=""
            aria-hidden="true"
            className="event-card__flyer-placeholder-icon"
          />
          <span>Flyer unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <button
      ref={(element) => registerFlyerButton(event.id, element)}
      type="button"
      className="event-card__flyer event-card__flyer-button"
      onClick={() => onOpen(event)}
      onMouseEnter={() => onPreload(event)}
      onFocus={() => onPreload(event)}
      aria-label={`View ${event.title} flyer`}
      data-full-src={getEventFlyerSrc(event.flyerFile)}
      data-event-id={event.id}
    >
      <img
        src={thumbnailSrc}
        alt={`${event.title} flyer`}
        className="event-card__flyer-image"
        width={DEFAULT_IMAGE_WIDTH}
        height={DEFAULT_IMAGE_HEIGHT}
        loading="lazy"
        decoding="async"
        onError={() => onImageError(event.id)}
      />
      <span className="event-card__flyer-chip">View Flyer</span>
    </button>
  );
};

const EventCard = ({
  event,
  imageErrors,
  now,
  onImageError,
  onOpen,
  onPreload,
  registerFlyerButton,
  variant,
}: EventCardProps) => {
  const description = normalizeEventDescription(event.description);
  const isPastEvent = isEventPast(event, now);

  return (
    <article className={`event-card event-card--${variant}`}>
      <EventFlyer
        event={event}
        imageErrors={imageErrors}
        onImageError={onImageError}
        onOpen={onOpen}
        onPreload={onPreload}
        registerFlyerButton={registerFlyerButton}
      />

      <div className="event-card__body">
        <div className="event-card__meta">
          <span className="event-card__semester">{semesterLabel(event.semester)}</span>
          {event.company ? <span className="event-card__company">{event.company}</span> : null}
        </div>

        <div className="event-card__copy">
          <h3 className="event-card__title">{event.title}</h3>

          <dl className="event-card__details">
            <div className="event-card__detail">
              <dt>Date</dt>
              <dd>{formatEventDateOnly(event.startTime)}</dd>
            </div>
            <div className="event-card__detail">
              <dt>Time</dt>
              <dd>{formatEventTimeOnly(event.startTime, event.endTime)}</dd>
            </div>
            {event.location ? (
              <div className="event-card__detail">
                <dt>Location</dt>
                <dd>{event.location}</dd>
              </div>
            ) : null}
          </dl>

          {description ? <p className="event-card__description">{description}</p> : null}
        </div>

        <div className="event-card__actions">
          {event.rsvpLink && !isPastEvent ? (
            <a
              href={event.rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="event-card__cta"
            >
              RSVP
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export const Events = () => {
  const heroAnimation = useScrollAnimation({ threshold: 0.18 });
  const upcomingAnimation = useScrollAnimation({
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });
  const archiveAnimation = useScrollAnimation({
    threshold: 0.06,
    rootMargin: '0px 0px -30px 0px',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const now = useCurrentTime();
  const archiveCutoffRef = useRef(new Date().toISOString());
  const archiveCacheRef = useRef(new Map<string, ArchiveCacheEntry>());
  const archiveRequestTokenRef = useRef(0);
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  const flyerButtonRefs = useRef(new Map<string, HTMLButtonElement>());

  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') ?? '');
  const deferredSearchInput = useDeferredValue(searchInput);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [archiveEvents, setArchiveEvents] = useState<Event[]>([]);
  const [availableSemesters, setAvailableSemesters] = useState<string[]>([]);

  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isArchiveLoading, setIsArchiveLoading] = useState(true);

  const [upcomingError, setUpcomingError] = useState<string | null>(null);
  const [archiveError, setArchiveError] = useState<string | null>(null);
  const [archiveLoadMoreError, setArchiveLoadMoreError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [modalFlyer, setModalFlyer] = useState<FlyerModalState | null>(null);
  const [upcomingRetryNonce, setUpcomingRetryNonce] = useState(0);
  const [archiveRetryNonce, setArchiveRetryNonce] = useState(0);
  const [archiveLoadedPages, setArchiveLoadedPages] = useState(0);
  const [archivePagination, setArchivePagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const activeSearch = searchParams.get('search')?.trim() ?? '';
  const activeSemester = searchParams.get('semester')?.trim() ?? '';
  const loadedArchivePages = parsePositiveInteger(searchParams.get('page'), 1);
  const hasActiveArchiveFilters = activeSearch.length > 0 || activeSemester.length > 0;
  const currentArchiveKey = useMemo(
    () => getArchiveCacheKey(activeSearch, activeSemester),
    [activeSearch, activeSemester]
  );

  const updateSearchParams = useCallback(
    (
      updates: Record<string, string | null>,
      options: { replace?: boolean; preventScrollReset?: boolean } = {}
    ) => {
      const nextParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          nextParams.delete(key);
          return;
        }

        nextParams.set(key, value);
      });

      setSearchParams(nextParams, {
        replace: options.replace ?? false,
        preventScrollReset: options.preventScrollReset ?? false,
      });
    },
    [searchParams, setSearchParams]
  );

  const preloadFullImage = useCallback(
    (event: Event) => {
      const fullSrc = getEventFlyerSrc(event.flyerFile);
      if (!fullSrc || imageErrors.has(event.id) || preloadedImagesRef.current.has(fullSrc)) {
        return;
      }

      const image = new Image();
      image.decoding = 'async';

      const finalize = () => {
        preloadedImagesRef.current.add(fullSrc);
      };

      image.onload = () => {
        if (typeof image.decode === 'function') {
          void image.decode().then(finalize).catch(finalize);
          return;
        }

        finalize();
      };

      image.onerror = () => {
        setImageErrors((previous) => new Set(previous).add(event.id));
      };

      image.src = fullSrc;
    },
    [imageErrors]
  );

  const handleImageError = useCallback((eventId: string) => {
    setImageErrors((previous) => new Set(previous).add(eventId));
  }, []);

  const handleOpenFlyer = useCallback(
    (event: Event) => {
      const fullSrc = getEventFlyerSrc(event.flyerFile);
      if (!fullSrc) {
        return;
      }

      preloadFullImage(event);
      setModalFlyer({
        src: fullSrc,
        title: event.title,
      });
    },
    [preloadFullImage]
  );

  const handleArchiveRetry = useCallback(() => {
    archiveCacheRef.current.delete(currentArchiveKey);
    setArchiveRetryNonce((previous) => previous + 1);
  }, [currentArchiveKey]);

  const handleArchiveLoadMoreRetry = useCallback(() => {
    setArchiveRetryNonce((previous) => previous + 1);
  }, []);

  const handleUpcomingRetry = useCallback(() => {
    setUpcomingRetryNonce((previous) => previous + 1);
  }, []);

  const registerFlyerButton = useCallback((eventId: string, element: HTMLButtonElement | null) => {
    if (element) {
      flyerButtonRefs.current.set(eventId, element);
      return;
    }

    flyerButtonRefs.current.delete(eventId);
  }, []);

  useEffect(() => {
    setSearchInput(searchParams.get('search') ?? '');
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const normalizedSearch = deferredSearchInput.trim();
      if (normalizedSearch === activeSearch) {
        return;
      }

      startTransition(() => {
        updateSearchParams(
          {
            search: normalizedSearch || null,
            page: '1',
          },
          { replace: true }
        );
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeSearch, deferredSearchInput, updateSearchParams]);

  useEffect(() => {
    let isCancelled = false;

    const fetchUpcomingEvents = async () => {
      try {
        setIsUpcomingLoading(true);
        setUpcomingError(null);
        const events = await dataService.events.getUpcoming(UPCOMING_EVENTS_LIMIT);

        if (isCancelled) {
          return;
        }

        startTransition(() => {
          setUpcomingEvents(events.sort(compareEventStarts));
        });
      } catch (error) {
        if (isCancelled) {
          return;
        }

        let message = 'Failed to load upcoming events.';
        if (error instanceof Error) {
          message = error.message;
        }

        setUpcomingError(message);
      } finally {
        if (!isCancelled) {
          setIsUpcomingLoading(false);
        }
      }
    };

    void fetchUpcomingEvents();

    return () => {
      isCancelled = true;
    };
  }, [upcomingRetryNonce]);

  useEffect(() => {
    let isCancelled = false;

    const fetchSemesterIndex = async () => {
      try {
        const semesters = await dataService.semesters.getAll();

        if (isCancelled) {
          return;
        }

        const nextSemesters = Array.from(
          new Set(semesters.map((semester) => semester.semesterName).filter(Boolean))
        ).sort((left, right) => semesterSortKey(right) - semesterSortKey(left));

        startTransition(() => {
          setAvailableSemesters(nextSemesters);
        });
      } catch (error) {
        console.error('Failed to build semester filter index:', error);
      }
    };

    void fetchSemesterIndex();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeSemester || availableSemesters.length === 0) {
      return;
    }

    if (availableSemesters.includes(activeSemester)) {
      return;
    }

    updateSearchParams(
      {
        semester: null,
        page: '1',
      },
      {
        replace: true,
        preventScrollReset: true,
      }
    );
  }, [activeSemester, availableSemesters, updateSearchParams]);

  useEffect(() => {
    let isCancelled = false;
    const requestToken = ++archiveRequestTokenRef.current;

    const applyArchiveEntry = (entry: ArchiveCacheEntry, requestedUiPages = loadedArchivePages) => {
      if (isCancelled || requestToken !== archiveRequestTokenRef.current) {
        return;
      }

      const nextPage = Math.min(requestedUiPages, Math.max(entry.totalPages, 1));
      const mergedVisibleEvents = mergeUniqueEvents(
        Array.from({ length: nextPage }, (_, index) => entry.pages.get(index + 1) ?? [])
      );
      const loadedPages = getLoadedArchivePages(entry);

      startTransition(() => {
        setArchiveEvents(mergedVisibleEvents);
        setArchiveLoadedPages(loadedPages);
        setArchivePagination({
          page: nextPage,
          totalPages: entry.totalPages,
          total: entry.total,
        });
      });
    };

    const fetchArchiveEvents = async () => {
      try {
        setArchiveError(null);
        setArchiveLoadMoreError(null);
        const cachedEntry = archiveCacheRef.current.get(currentArchiveKey);

        if (cachedEntry && getLoadedArchivePages(cachedEntry) >= loadedArchivePages) {
          applyArchiveEntry(cachedEntry);
          setIsArchiveLoading(false);
          return;
        }

        if (!cachedEntry) {
          startTransition(() => {
            setArchiveEvents([]);
            setArchiveLoadedPages(0);
            setArchivePagination({
              page: 1,
              totalPages: 1,
              total: 0,
            });
          });
        }

        setIsArchiveLoading(true);

        const archiveQuery = {
          limit: ARCHIVE_PAGE_SIZE,
          search: activeSearch || undefined,
          semester: activeSemester || undefined,
          endDate: archiveCutoffRef.current,
          sort: 'startTime:desc' as const,
        };

        let nextEntry: ArchiveCacheEntry =
          cachedEntry ??
          ({
            pages: new Map<number, Event[]>(),
            totalPages: 1,
            total: 0,
          } satisfies ArchiveCacheEntry);

        const targetPage = Math.max(1, loadedArchivePages);
        while (getLoadedArchivePages(nextEntry) < targetPage) {
          const nextPageNumber = getLoadedArchivePages(nextEntry) + 1;
          const response = await dataService.events.getAll({
            page: nextPageNumber,
            ...archiveQuery,
          });

          if (isCancelled || requestToken !== archiveRequestTokenRef.current) {
            return;
          }

          nextEntry = {
            pages: new Map(nextEntry.pages).set(response.pagination.page, response.events),
            totalPages: response.pagination.totalPages || 1,
            total: response.pagination.total,
          };

          archiveCacheRef.current.set(currentArchiveKey, nextEntry);

          if (response.pagination.page >= nextEntry.totalPages) {
            break;
          }
        }

        applyArchiveEntry(nextEntry);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        let message = 'Failed to load the event archive.';
        if (error instanceof Error) {
          message = error.message;
        }

        const cachedEntry = archiveCacheRef.current.get(currentArchiveKey);
        const loadedPages = cachedEntry ? getLoadedArchivePages(cachedEntry) : 0;
        if (cachedEntry && loadedPages > 0 && loadedArchivePages > loadedPages) {
          setArchiveLoadMoreError(message);
          applyArchiveEntry(cachedEntry, loadedPages);
        } else {
          setArchiveError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsArchiveLoading(false);
        }
      }
    };

    void fetchArchiveEvents();

    return () => {
      isCancelled = true;
    };
  }, [activeSearch, activeSemester, archiveRetryNonce, currentArchiveKey, loadedArchivePages]);

  const isArchiveLoadingMore = isArchiveLoading && loadedArchivePages > archiveLoadedPages;

  useEffect(() => {
    if (isArchiveLoading) {
      return;
    }

    if (loadedArchivePages <= archivePagination.totalPages) {
      return;
    }

    updateSearchParams(
      {
        page: String(archivePagination.page),
      },
      {
        replace: true,
        preventScrollReset: true,
      }
    );
  }, [
    archivePagination.page,
    archivePagination.totalPages,
    isArchiveLoading,
    loadedArchivePages,
    updateSearchParams,
  ]);

  useEffect(() => {
    if (!modalFlyer) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalFlyer(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalFlyer]);

  const displayedEvents = useMemo(
    () => [...upcomingEvents, ...archiveEvents].filter((event) => event.flyerFile),
    [archiveEvents, upcomingEvents]
  );

  useEffect(() => {
    if (displayedEvents.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const eventId = entry.target.getAttribute('data-event-id');
          const event = displayedEvents.find((candidate) => candidate.id === eventId);
          if (!event) {
            return;
          }

          preloadFullImage(event);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.15,
      }
    );

    displayedEvents.forEach((event) => {
      const element = flyerButtonRefs.current.get(event.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [displayedEvents, preloadFullImage]);

  return (
    <>
      <div className="page-container events-page">
        <SubpageHero
          ref={heroAnimation.elementRef}
          visible={heroAnimation.isVisible}
          className="events-hero"
          backgroundImageSrc="/events-gallery/events-gallery-1.jpeg"
          backgroundImageAlt="SJBA members at an event"
          imagePosition="center 72%"
          title="Events"
          lead="Explore upcoming speaker sessions, archive highlights, and the programming that shapes SJBA each semester."
        />

        <section className="events-shell">
          <section
            ref={upcomingAnimation.elementRef}
            className={`events-upcoming ${upcomingAnimation.isVisible ? 'visible' : ''}`}
            aria-labelledby="events-upcoming-title"
          >
            <div className="events-section-heading events-section-heading--archive">
              <div>
                <span className="events-section__eyebrow">Upcoming Events</span>
                <h2 id="events-upcoming-title">The next conversations on deck.</h2>
              </div>
            </div>

            {isUpcomingLoading ? (
              <div className="events-status">
                <LoadingSpinner />
              </div>
            ) : upcomingError ? (
              <div className="events-status">
                <ErrorDisplay error={upcomingError} onRetry={handleUpcomingRetry} />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="events-empty-state">
                <p>No upcoming events are scheduled yet.</p>
              </div>
            ) : (
              <div className="events-archive__list">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    imageErrors={imageErrors}
                    now={now}
                    onImageError={handleImageError}
                    onOpen={handleOpenFlyer}
                    onPreload={preloadFullImage}
                    registerFlyerButton={registerFlyerButton}
                    variant="upcoming"
                  />
                ))}
              </div>
            )}
          </section>

          <section
            id="events-archive"
            ref={archiveAnimation.elementRef}
            className={`events-archive-shell ${archiveAnimation.isVisible ? 'visible' : ''}`}
            aria-labelledby="events-archive-title"
          >
            <div className="events-overview" aria-label="Events page controls">
              <div className="events-overview__panel">
                <form
                  className="events-search"
                  role="search"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label htmlFor="events-search-input" className="events-visually-hidden">
                    Search events
                  </label>
                  <input
                    id="events-search-input"
                    name="search"
                    type="search"
                    inputMode="search"
                    autoComplete="off"
                    value={searchInput}
                    onChange={(event) => {
                      const { value } = event.target;
                      startTransition(() => {
                        setSearchInput(value);
                      });
                    }}
                    placeholder="Search previous events…"
                    className="events-search__input"
                  />
                  {searchInput ? (
                    <button
                      type="button"
                      className="events-search__clear"
                      onClick={() => {
                        startTransition(() => {
                          setSearchInput('');
                        });
                      }}
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  ) : null}
                </form>

                <div className="events-semesters">
                  <div className="events-semesters__header">
                    <span className="events-section__eyebrow">Filter by Semester</span>
                    {activeSemester ? (
                      <button
                        type="button"
                        className="events-semesters__reset"
                        onClick={() =>
                          updateSearchParams({
                            semester: null,
                            page: '1',
                          })
                        }
                      >
                        Reset
                      </button>
                    ) : null}
                  </div>

                  <div className="events-semesters__rail" role="list" aria-label="Semester filters">
                    <button
                      type="button"
                      className={`events-semesters__chip ${!activeSemester ? 'is-active' : ''}`}
                      onClick={() =>
                        updateSearchParams({
                          semester: null,
                          page: '1',
                        })
                      }
                    >
                      All Semesters
                    </button>

                    {availableSemesters.map((semester) => (
                      <button
                        key={semester}
                        type="button"
                        className={`events-semesters__chip ${activeSemester === semester ? 'is-active' : ''}`}
                        onClick={() =>
                          updateSearchParams({
                            semester: semester,
                            page: '1',
                          })
                        }
                      >
                        {semesterLabel(semester)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`events-archive ${archiveAnimation.isVisible ? 'visible' : ''}`}>
              <div className="events-section-heading events-section-heading--archive">
                <div>
                  <span className="events-section__eyebrow">Previous Events</span>
                </div>
              </div>

              {isArchiveLoading && archiveEvents.length === 0 ? (
                <div className="events-status">
                  <LoadingSpinner />
                </div>
              ) : archiveError ? (
                <div className="events-status">
                  <ErrorDisplay error={archiveError} onRetry={handleArchiveRetry} />
                </div>
              ) : archiveEvents.length === 0 ? (
                <div className="events-empty-state">
                  <p>
                    {hasActiveArchiveFilters
                      ? 'No events matched the current search and semester filters.'
                      : 'No archived events are available yet.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="events-archive__list">
                    {archiveEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        imageErrors={imageErrors}
                        now={now}
                        onImageError={handleImageError}
                        onOpen={handleOpenFlyer}
                        onPreload={preloadFullImage}
                        registerFlyerButton={registerFlyerButton}
                        variant="archive"
                      />
                    ))}
                  </div>

                  {archivePagination.page < archivePagination.totalPages ? (
                    <div className="events-archive__load-more">
                      {archiveLoadMoreError ? (
                        <div className="events-archive__load-error" role="alert" aria-live="polite">
                          <p>{archiveLoadMoreError}</p>
                          <button
                            type="button"
                            className="events-load-more"
                            onClick={handleArchiveLoadMoreRetry}
                          >
                            Try Again
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="events-load-more"
                            disabled={isArchiveLoadingMore}
                            aria-busy={isArchiveLoadingMore}
                            onClick={() =>
                              updateSearchParams(
                                {
                                  page: String(archivePagination.page + 1),
                                },
                                {
                                  preventScrollReset: true,
                                }
                              )
                            }
                          >
                            {isArchiveLoadingMore ? 'Loading More…' : 'Load More Events'}
                          </button>
                          {isArchiveLoadingMore ? (
                            <span className="events-archive__load-status">Adding more events…</span>
                          ) : null}
                        </>
                      )}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </section>
        </section>
      </div>

      <Footer />

      {modalFlyer ? (
        <div className="events-flyer-modal" role="presentation" onClick={() => setModalFlyer(null)}>
          <div
            className="events-flyer-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${modalFlyer.title} flyer`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="events-flyer-modal__close"
              onClick={() => setModalFlyer(null)}
              aria-label="Close flyer viewer"
            >
              <span className="events-flyer-modal__close-icon" aria-hidden="true"></span>
            </button>

            <img
              src={modalFlyer.src}
              alt={`${modalFlyer.title} flyer`}
              className="events-flyer-modal__image"
              width={DEFAULT_IMAGE_WIDTH}
              height={DEFAULT_IMAGE_HEIGHT}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
