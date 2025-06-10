import { Link } from 'react-router-dom';
import './NavButton.css';

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
  onClick?: () => void;
}

const NavButton = ({ to, children, variant = 'default', className = '', onClick }: NavButtonProps) => {
  return (
    <Link to={to} className={`nav-button nav-button--${variant} ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavButton; 