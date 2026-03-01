import { motion, useReducedMotion } from 'motion/react';
import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 1, ease: 'linear', repeat: Number.POSITIVE_INFINITY }
        }
      />
    </div>
  );
};
