import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { BoardMember } from '../data/BoardMembers';
import { boardMembers } from '../data/BoardMembers';
import './OurBoard.css';

const OurBoard = () => {
  // Scroll animation hooks for different sections with mobile-friendly settings
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

  // Fallback mechanism for mobile - ensure animations trigger after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceVisible(true);
    }, 1000); // Show animations after 1 second if they haven't triggered naturally

    return () => clearTimeout(timeout);
  }, []);

  const handleImageError = (memberName: string) => {
    setImageErrors(prev => new Set(prev).add(memberName));
  };

  const shouldShowPlaceholder = (member: BoardMember) => {
    return !member.headshot_file || member.headshot_file === "#" || imageErrors.has(member.name);
  };

  const formatLinkedInUrl = (url: string) => {
    if (!url || url === "#") return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
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
          <div className={`board-grid stagger-children ${boardAnimation.isVisible || forceVisible ? 'visible' : ''}`}>
            {boardMembers.map((member, index) => (
              <div 
                key={index} 
                className="board-member-card stagger-item"
                onClick={() => openModal(member)}
              >
                <div className="member-photo">
                  {shouldShowPlaceholder(member) ? (
                    <div className="photo-placeholder">
                      <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  ) : (
                    <img 
                      src={`/headshots/${member.headshot_file}`}
                      alt={`${member.name} headshot`}
                      className="member-headshot"
                      onError={() => handleImageError(member.name)}
                    />
                  )}
                </div>
                <div className="member-info">
                  <div className="member-name-row">
                    <h3 className="member-name">{member.name}</h3>
                    <div className="member-icon-buttons">
                      <a href={`mailto:${member.email}`} className="member-icon-btn email-icon" title="Send Email" onClick={(e) => e.stopPropagation()}>
                        <img src="/icons/email_icon.png" alt="Email" />
                      </a>
                      <a href={formatLinkedInUrl(member.linkedin)} className="member-icon-btn linkedin-icon" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" onClick={(e) => e.stopPropagation()}>
                        <img src="/logos/linkedin_logo.png" alt="LinkedIn" />
                      </a>
                    </div>
                  </div>
                  <h4 className="member-position">{member.position}</h4>
                  {/* <p className="member-details">{member.major} • {member.year}</p> */}
                  <p className="member-details">{member.major}</p>
                  <div className="click-hint">Click to learn more</div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Modal Overlay */}
      {selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-name-row">
                  <h2 className="modal-name">{selectedMember.name}</h2>
                  <div className="modal-icon-buttons">
                    <a href={`mailto:${selectedMember.email}`} className="modal-icon-btn email-icon" title="Send Email">
                      <img src="/icons/email_icon.png" alt="Email" />
                    </a>
                    <a href={formatLinkedInUrl(selectedMember.linkedin)} className="modal-icon-btn linkedin-icon" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn">
                      <img src="/logos/linkedin_logo.png" alt="LinkedIn" />
                    </a>
                  </div>
                </div>
                <h3 className="modal-position">{selectedMember.position}</h3>
                <p className="modal-details">{selectedMember.major} • {selectedMember.year}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-content-layout">
                <div className="modal-photo-section">
                  {shouldShowPlaceholder(selectedMember) ? (
                    <div className="photo-placeholder large">
                      <span>{selectedMember.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  ) : (
                    <img 
                      src={`/headshots/${selectedMember.headshot_file}`}
                      alt={`${selectedMember.name} headshot`}
                      className="member-headshot large"
                      onError={() => handleImageError(selectedMember.name)}
                    />
                  )}
                </div>
                <div className="modal-text-section">
                  <div className="modal-section">
                    <h4>About</h4>
                    <p>{selectedMember.bio}</p>
                  </div>
                  <div className="modal-info-grid">
                    <div className="modal-section">
                      <h4>Hometown</h4>
                      <p>{selectedMember.hometown}</p>
                    </div>
                    <div className="modal-section">
                      <h4>Email</h4>
                      <p>{selectedMember.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default OurBoard; 