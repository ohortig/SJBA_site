import { NavLink } from 'react-router-dom';
import './NavButton.css';

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
  onClick?: () => void;
}

export const NavButton = ({
  to,
  children,
  variant = 'default',
  className = '',
  onClick,
}: NavButtonProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-button nav-button--${variant} ${isActive ? 'is-active' : ''} ${className}`.trim()
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
