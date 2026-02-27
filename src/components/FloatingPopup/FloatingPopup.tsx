import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useIsMobile } from '@hooks';
import './FloatingPopup.css';

interface FloatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const FloatingPopup = ({
  isOpen,
  onClose,
  eyebrow,
  title,
  subtitle,
  thumbnailSrc,
  thumbnailAlt = 'Popup thumbnail',
  children,
  footer,
  className,
  ariaLabel = 'Floating popup',
}: FloatingPopupProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const hiddenAnimation = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 32, x: isMobile ? 0 : 16, scale: 0.97 };
  const visibleAnimation = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="dialog"
          aria-label={ariaLabel}
          initial={hiddenAnimation}
          animate={visibleAnimation}
          exit={hiddenAnimation}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: 'easeOut' }}
          className={['floating-popup', eyebrow ? 'floating-popup--has-topbar' : '', className]
            .filter(Boolean)
            .join(' ')}
        >
          {eyebrow && (
            <div className="floating-popup__topbar">
              <p className="floating-popup__eyebrow">{eyebrow}</p>
            </div>
          )}

          <button
            type="button"
            className="floating-popup__close"
            onClick={onClose}
            aria-label="Close popup"
          >
            ×
          </button>

          <div className="floating-popup__content">
            {thumbnailSrc && (
              <div className="floating-popup__thumbnail">
                <img src={thumbnailSrc} alt={thumbnailAlt} loading="lazy" />
              </div>
            )}

            <div className="floating-popup__main">
              <h3 className="floating-popup__title">{title}</h3>
              {subtitle && <p className="floating-popup__subtitle">{subtitle}</p>}

              {children && <div className="floating-popup__body">{children}</div>}
              {footer && <div className="floating-popup__footer">{footer}</div>}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
