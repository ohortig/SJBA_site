import { useState, useEffect, useRef, useCallback } from 'react';
import { Footer, LoadingSpinner, ErrorDisplay, BoardMemberModal, CallToAction } from '@components';
import { useScrollAnimation } from '@hooks';
import { dataService } from '@api';
import { BOARD_IMAGES_BUCKET, BOARD_THUMBNAILS_BUCKET } from '@constants';
import type { BoardMember } from '@types';
import './OurBoard.css';

export const OurBoard = () => {
  const headerAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });
  const boardAnimation = useScrollAnimation({
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px',
  });

  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [forceVisible, setForceVisible] = useState(false);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const preloadedImagesRef = useRef<Set<string>>(new Set());

  // Fetch board members data
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const members = await dataService.boardMembers.getAll();
        setBoardMembers(members);
      } catch (error) {
        console.error('Failed to fetch board members:', error);
        // Check if it's an API error with a message, otherwise use a generic message
        let errorMessage = 'Failed to load board members. Please try again later.';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchBoardMembers();
  }, []);

  // Preload full-resolution images in the background
  // so they're already cached when the modal opens
  useEffect(() => {
    if (boardMembers.length === 0) return;

    const preloadImages = boardMembers
      .filter((member) => member.headshotFile && !imageErrors.has(member.fullName))
      .map((member) => {
        const img = new Image();
        const fullSrc = `${BOARD_IMAGES_BUCKET}${member.headshotFile}`;
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
  }, [boardMembers, imageErrors]);

  // Fallback mechanism for mobile - ensure animations trigger after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceVisible(true);
    }, 1000); // Show animations after 1 second if they haven't triggered naturally

    return () => clearTimeout(timeout);
  }, []);

  const handleImageError = useCallback((memberName: string) => {
    if (!memberName) return;
    setImageErrors((prev) => new Set(prev).add(memberName));
  }, []);

  const shouldShowPlaceholder = useCallback(
    (member: BoardMember) => {
      return !member.headshotFile || imageErrors.has(member.fullName);
    },
    [imageErrors]
  );

  const openModal = (member: BoardMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <div className="page-container">
        <div
          ref={headerAnimation.elementRef}
          className={`board-header slide-up ${headerAnimation.isVisible ? 'visible' : ''}`}
        >
          <h1 className="board-title">Our Board</h1>
          <p className="board-subtitle">Meet the dedicated leaders driving SJBA's mission.</p>
        </div>

        <div
          ref={boardAnimation.elementRef}
          className={`board-section slide-up ${boardAnimation.isVisible || forceVisible ? 'visible' : ''}`}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
          ) : (
            <div
              className={`board-grid stagger-children ${boardAnimation.isVisible || forceVisible ? 'visible' : ''}`}
            >
              {boardMembers
                .filter((member) => member && member.fullName)
                .map((member, index) => (
                  <div
                    key={index}
                    className="board-member-card stagger-item"
                    onClick={() => openModal(member)}
                  >
                    <div className="member-photo">
                      {shouldShowPlaceholder(member) ? (
                        <div className="photo-placeholder">
                          <span>
                            {member.fullName
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={`${BOARD_THUMBNAILS_BUCKET}${member.headshotFile?.replace(/\.(png|webp|jpeg)$/i, '.jpg')}`}
                          alt={`${member.fullName} headshot`}
                          className="member-headshot"
                          onError={() => handleImageError(member.fullName)}
                        />
                      )}
                    </div>
                    <div className="member-info">
                      <div className="member-name-row">
                        <h3 className="member-name">{member.fullName}</h3>
                        <div className="member-icon-buttons">
                          <a
                            href={`mailto:${member.email}`}
                            className="member-icon-btn email-icon"
                            title="Send Email"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img src="/icons/email-icon.png" alt="Email" />
                          </a>
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              className="member-icon-btn linkedin-icon"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Connect on LinkedIn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src="/icons/linkedin-logo.png" alt="LinkedIn" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h4 className="member-position">{member.position}</h4>
                      <p className="member-details">{member.major}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <CallToAction
          title="Interested in Joining Our Board?"
          bodyText="SJBA is always looking for passionate students who want to make a difference in the Jewish community at NYU Stern. Board positions become available each academic year through our application process."
          primaryButtonText="Get Involved"
          primaryButtonHref="/contact"
          secondaryButtonText="Attend Our Events"
          secondaryButtonHref="/events"
        />
      </div>

      <BoardMemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={closeModal}
        onImageError={handleImageError}
        shouldShowPlaceholder={shouldShowPlaceholder}
      />

      <Footer />
    </>
  );
};
