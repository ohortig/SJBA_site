import { STATUS_PAGE_URL } from '@constants';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  showStatusLink?: boolean;
}

export const ErrorDisplay = ({ error, onRetry, showStatusLink = true }: ErrorDisplayProps) => {
  const normalizedError = error.toLowerCase();
  const containsStatusReference =
    normalizedError.includes('status.nyu-sjba.org') ||
    normalizedError.includes('sjba service status') ||
    normalizedError.includes('service status') ||
    normalizedError.includes('platform status');

  const shouldShowStatusLink = showStatusLink && !containsStatusReference;

  return (
    <div className="loading-container" role="alert" aria-live="polite">
      <div className="error-icon" aria-hidden="true">
        <img src="/icons/error.svg" alt="" />
      </div>
      <p className="error-text">{error}</p>
      {shouldShowStatusLink && (
        <div className="error-status-chip">
          <span className="error-status-label">Real-time updates</span>
          <a className="error-status-link" href={STATUS_PAGE_URL} target="_blank" rel="noreferrer">
            SJBA Service Status
          </a>
        </div>
      )}
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
