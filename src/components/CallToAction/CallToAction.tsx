import './CallToAction.css';
import { useScrollAnimation } from '@hooks';

interface CallToActionProps {
  title: string;
  bodyText?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const CallToAction = ({
  title,
  bodyText,
  primaryButtonText = 'Get Involved',
  primaryButtonHref = '/contact',
  secondaryButtonText = 'Attend Our Events',
  secondaryButtonHref = '/events',
}: CallToActionProps) => {
  const animation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });

  return (
    <div
      ref={animation.elementRef}
      className={`call-to-action-section ${animation.isVisible ? 'visible' : ''}`}
    >
      <div className="call-to-action-content">
        <h2>{title}</h2>
        {bodyText && <p>{bodyText}</p>}
        <div className="call-to-action-buttons">
          <a href={primaryButtonHref} className="call-to-action-btn primary">
            {primaryButtonText}
          </a>
          <a href={secondaryButtonHref} className="call-to-action-btn secondary">
            {secondaryButtonText}
          </a>
        </div>
      </div>
    </div>
  );
};
