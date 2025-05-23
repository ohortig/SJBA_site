import { Link } from 'react-router-dom';
import './NavButton.css';

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

const NavButton = ({ to, children, variant = 'default', className = '' }: NavButtonProps) => {
  return (
    <Link to={to} className={`nav-button nav-button--${variant} ${className}`}>
      {children}
    </Link>
  );
};

export default NavButton; 