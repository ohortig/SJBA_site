import { Link } from 'react-router-dom';
import './InlineLink.css';

interface InlineLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  rel?: string;
  target?: string;
  to?: string;
  useArrow?: boolean;
}

export const InlineLink = ({
  children,
  className = '',
  href,
  rel,
  target,
  to,
  useArrow = true,
}: InlineLinkProps) => {
  const classes = `inline-link ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {useArrow && (
        <svg className="inline-link__arrow" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M2.5 8h9.5M8.5 4.5L12 8l-3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target={target} rel={rel} className={classes}>
      {content}
    </a>
  );
};
