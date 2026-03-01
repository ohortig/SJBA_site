import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './SocialLink.css';

interface SocialLinkProps {
  href: string;
  platform: 'linkedin' | 'instagram';
  name: string;
  handle: string;
  iconSrc: string;
  alt: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  platform,
  name,
  handle,
  iconSrc,
  alt,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-link ${platform}`}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
              boxShadow: '0 8px 24px rgba(76, 13, 127, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
    >
      <div className="social-icon-placeholder">
        <img src={iconSrc} alt={alt} className="social-icon" />
      </div>
      <div className="social-text">
        <span className="social-name">{name}</span>
        <span className="social-handle">{handle}</span>
      </div>
    </motion.a>
  );
};
