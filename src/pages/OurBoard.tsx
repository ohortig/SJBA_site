import React, { useState } from 'react';
import Footer from '../components/Footer';
import type { BoardMember } from '../data/BoardMembers';
import { boardMembers } from '../data/BoardMembers';
import './OurBoard.css';

const OurBoard = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

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
                  <div className="photo-placeholder">
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <h4 className="member-position">{member.position}</h4>
                  <p className="member-details">{member.major} • {member.year}</p>
                  <p className="member-bio">{member.bio}</p>
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
                <div className="photo-placeholder large">
                  <span>{selectedMember.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
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
                <p>{selectedMember.detailedBio}</p>
              </div>
              <div className="modal-info-grid">
                <div className="modal-section">
                  <h4>Hometown</h4>
                  <p>{selectedMember.hometown}</p>
                </div>
                <div className="modal-section">
                  <h4>Interests</h4>
                  <p>{selectedMember.interests}</p>
                </div>
              </div>
              <div className="modal-actions">
                <a href={selectedMember.linkedin} className="modal-btn linkedin" target="_blank" rel="noopener noreferrer">
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