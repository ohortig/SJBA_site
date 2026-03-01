import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './NavButton.css';

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
  onClick?: () => void;
}

const MotionLink = motion.create(Link);

export const NavButton = ({
  to,
  children,
  variant = 'default',
  className = '',
  onClick,
}: NavButtonProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionLink
      to={to}
      className={`nav-button nav-button--${variant} ${className}`}
      onClick={onClick}
      whileHover={shouldReduceMotion ? undefined : variant === 'primary' ? { y: -2 } : { y: -1 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
    >
      {children}
    </MotionLink>
  );
};
