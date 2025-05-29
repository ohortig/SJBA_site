import React, { useState } from 'react';
import Footer from '../components/Footer';
import type { BoardMember } from '../data/BoardMembers';
import { boardMembers } from '../data/BoardMembers';
import './OurBoard.css';

const OurBoard = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

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
        <div className="board-header">
          <h1 className="board-title">Our Board</h1>
          <p className="board-subtitle">
            Meet the dedicated leaders driving SJBA's mission to build Jewish community 
            and develop future business leaders at NYU Stern.
          </p>
        </div>

        <div className="board-section">
          <div className="board-grid">
            {boardMembers.map((member, index) => (
              <div 
                key={index} 
                className="board-member-card"
                onClick={() => openModal(member)}
              >
                <div className="member-photo">
                  {shouldShowPlaceholder(member) ? (
                    <div className="photo-placeholder">
                      <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  ) : (
                    <img 
                      src={`/src/headshots/${member.headshot_file}`}
                      alt={`${member.name} headshot`}
                      className="member-headshot"
                      onError={() => handleImageError(member.name)}
                    />
                  )}
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <h4 className="member-position">{member.position}</h4>
                  <p className="member-details">{member.major} • {member.year}</p>
                  <div className="click-hint">Click to learn more</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="join-board-section">
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
              <div className="modal-photo">
                {shouldShowPlaceholder(selectedMember) ? (
                  <div className="photo-placeholder large">
                    <span>{selectedMember.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                ) : (
                  <img 
                    src={`/src/headshots/${selectedMember.headshot_file}`}
                    alt={`${selectedMember.name} headshot`}
                    className="member-headshot large"
                    onError={() => handleImageError(selectedMember.name)}
                  />
                )}
              </div>
              <div className="modal-title-section">
                <h2 className="modal-name">{selectedMember.name}</h2>
                <h3 className="modal-position">{selectedMember.position}</h3>
                <p className="modal-details">{selectedMember.major} • {selectedMember.year}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h4>About</h4>
                <p>{selectedMember.bio}</p>
              </div>
              <div className="modal-info-grid">
                <div className="modal-section">
                  <h4>Hometown</h4>
                  <p>{selectedMember.hometown}</p>
                </div>
              </div>
              <div className="modal-actions">
                <a href={formatLinkedInUrl(selectedMember.linkedin)} className="modal-btn linkedin" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
                <a href={`mailto:${selectedMember.email}`} className="modal-btn email">
                  Send Email
                </a>
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