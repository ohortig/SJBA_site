import { motion, useReducedMotion } from 'motion/react';
import './LogoGallery.css';

export interface Logo {
  name: string;
  src: string;
  hasImage?: boolean;
}

interface LogoGalleryProps {
  direction?: 'left' | 'right';
  logos: Logo[];
}

export const LogoGallery = ({ direction = 'left', logos }: LogoGalleryProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="logo-gallery-container">
      <motion.div
        className={`logo-gallery ${direction === 'right' ? 'logo-gallery-right' : ''}`}
        animate={
          shouldReduceMotion
            ? { x: '0%' }
            : direction === 'right'
              ? { x: ['-50%', '0%'] }
              : { x: ['0%', '-50%'] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 60, ease: 'linear', repeat: Number.POSITIVE_INFINITY }
        }
      >
        {logos.map((logo, index) => (
          <div key={`set1-${index}`} className="logo-item">
            {logo.hasImage !== false ? (
              <>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="company-logo"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <span className="logo-fallback" style={{ display: 'none' }}>
                  {logo.name}
                </span>
              </>
            ) : (
              <span className="logo-text">{logo.name}</span>
            )}
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={`set2-${index}`} className="logo-item">
            {logo.hasImage !== false ? (
              <>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="company-logo"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <span className="logo-fallback" style={{ display: 'none' }}>
                  {logo.name}
                </span>
              </>
            ) : (
              <span className="logo-text">{logo.name}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
