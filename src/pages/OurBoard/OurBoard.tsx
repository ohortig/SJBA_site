import { useState, useEffect } from 'react';
import { Footer, LoadingSpinner, ErrorDisplay, BoardMemberModal } from '@components';
import { useScrollAnimation } from '@hooks';
import { dataService } from '@api'; 
import { BOARD_IMAGES_BUCKET } from '@constants';
import type { BoardMember } from '@types';
import './OurBoard.css';

export const OurBoard = () => {
  const headerAnimation = useScrollAnimation({ 
    threshold: 0.1, 
    rootMargin: '0px 0px -20px 0px' 
  });
  const boardAnimation = useScrollAnimation({ 
    threshold: 0.05, 
    rootMargin: '0px 0px 0px 0px' 
  });
  const joinBoardAnimation = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [forceVisible, setForceVisible] = useState(false);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        
        if (error && typeof error === 'object') {
          if ('response' in error && error.response && typeof error.response === 'object' && 
              'data' in error.response && error.response.data && typeof error.response.data === 'object' &&
              'message' in error.response.data && typeof error.response.data.message === 'string') {
            errorMessage = error.response.data.message;
          } else if ('message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchBoardMembers();
  }, []);

  // Fallback mechanism for mobile - ensure animations trigger after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceVisible(true);
    }, 1000); // Show animations after 1 second if they haven't triggered naturally

    return () => clearTimeout(timeout);
  }, []);

  const handleImageError = (memberName: string) => {
    if (!memberName) return;
    setImageErrors(prev => new Set(prev).add(memberName));
  };


  const shouldShowPlaceholder = (member: BoardMember) => {
    return !member.headshotFile || imageErrors.has(member.fullName);
  };

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
          <p className="board-subtitle">
            Meet the dedicated leaders driving SJBA's mission.
          </p>
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
            <div className={`board-grid stagger-children ${boardAnimation.isVisible || forceVisible ? 'visible' : ''}`}>
              {boardMembers.filter(member => member && member.fullName).map((member, index) => (
              <div 
                key={index} 
                className="board-member-card stagger-item"
                onClick={() => openModal(member)}
              >
                <div className="member-photo">
                  {shouldShowPlaceholder(member) ? (
                    <div className="photo-placeholder">
                      <span>{member.fullName.split(' ').map((n: string) => n[0]).join('')}</span>
                    </div>
                  ) : (
                    <img 
                      src={`${BOARD_IMAGES_BUCKET}${member.headshotFile}`}
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
                      <a href={`mailto:${member.email}`} className="member-icon-btn email-icon" title="Send Email" onClick={(e) => e.stopPropagation()}>
                        <img src="/icons/email_icon.png" alt="Email" />
                      </a>
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} className="member-icon-btn linkedin-icon" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" onClick={(e) => e.stopPropagation()}>
                          <img src="/logos/linkedin_logo.png" alt="LinkedIn" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="member-position">{member.position}</h4>
                  <p className="member-details">{member.major}</p>
                  <div className="click-hint">Click to learn more</div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        <div 
          ref={joinBoardAnimation.elementRef}
          className={`join-board-section ${joinBoardAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="join-board-content">
            <h2>Interested in Joining Our Board?</h2>
            <p>
              SJBA is always looking for passionate students who want to make a difference 
              in the Jewish community at NYU Stern. Board positions become available each 
              academic year through our application process.
            </p>
            <div className="join-board-buttons">
              <a href="/contact" className="join-board-btn primary">
                Get Involved
              </a>
              <a href="/events" className="join-board-btn secondary">
                Attend Our Events
              </a>
            </div>
          </div>
        </div>
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