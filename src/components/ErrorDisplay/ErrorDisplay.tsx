import './ErrorDisplay.css';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <div className="loading-container">
    <div className="error-icon">⚠️</div>
    <p className="error-text">{error}</p>
    {onRetry && (
      <button className="retry-button" onClick={onRetry}>
        Try Again
      </button>
    )}
  </div>
);
