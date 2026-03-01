import type { Transition } from 'motion/react';

export const MOTION_EASE_STANDARD: Transition['ease'] = [0.25, 0.46, 0.45, 0.94];

export const MOTION_TRANSITION_STANDARD: Transition = {
  duration: 0.24,
  ease: MOTION_EASE_STANDARD,
};

export const MOTION_TRANSITION_FAST: Transition = {
  duration: 0.16,
  ease: 'easeOut',
};
