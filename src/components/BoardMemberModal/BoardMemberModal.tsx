import React, { useEffect } from 'react';
import { BOARD_IMAGES_BUCKET } from '../../constants';
import type { BoardMember } from '../../types';
import './BoardMemberModal.css';

interface BoardMemberModalProps {
  member: BoardMember | null;
  isOpen: boolean;
  onClose: () => void;
  onImageError: (memberName: string) => void;
  shouldShowPlaceholder: (member: BoardMember) => boolean;
}

export const BoardMemberModal: React.FC<BoardMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onImageError,
  shouldShowPlaceholder,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <div className="modal-title-section">
            <div className="modal-name-row">
              <h2 className="modal-name">{member.fullName}</h2>
              <div className="modal-icon-buttons">
                <a
                  href={`mailto:${member.email}`}
                  className="modal-icon-btn email-icon"
                  title="Send Email"
                >
                  <img src="/icons/email-icon.png" alt="Email" />
                </a>
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    className="modal-icon-btn linkedin-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Connect on LinkedIn"
                  >
                    <img src="/icons/linkedin-logo.png" alt="LinkedIn" />
                  </a>
                )}
              </div>
            </div>
            <h3 className="modal-position">{member.position}</h3>
            <p className="modal-details">
              {member.major} • {member.year}
            </p>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-content-layout">
            <div className="modal-photo-section">
              {shouldShowPlaceholder(member) ? (
                <div className="photo-placeholder large">
                  <span>
                    {member.fullName
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </span>
                </div>
              ) : (
                <img
                  src={`${BOARD_IMAGES_BUCKET}${member.headshotFile}`}
                  alt={`${member.fullName} headshot`}
                  className="member-headshot large"
                  onError={() => onImageError(member.fullName)}
                />
              )}
            </div>
            <div className="modal-text-section">
              <div className="modal-section">
                <h4>About</h4>
                <p>
                  {member.bio.split('\n').map((line, index, array) => (
                    <span key={index}>
                      {line}
                      {index < array.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <div className="modal-info-grid">
                <div className="modal-section">
                  <h4>Hometown</h4>
                  <p>{member.hometown}</p>
                </div>
                <div className="modal-section">
                  <h4>Email</h4>
                  <p>{member.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
