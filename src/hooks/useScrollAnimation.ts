import { useMemo, useRef, type RefObject } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollAnimationResult<T extends HTMLElement> {
  elementRef: RefObject<T | null>;
  isVisible: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationResult<T> => {
  const { threshold = 0.05, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  const shouldReduceMotion = useReducedMotion();
  const elementRef = useRef<T>(null);

  const inViewOptions = useMemo(
    () => ({
      amount: clamp(threshold, 0, 1),
      margin: rootMargin as `${number}px ${number}px ${number}px ${number}px`,
      once: triggerOnce,
    }),
    [threshold, rootMargin, triggerOnce]
  );

  const isInView = useInView(elementRef, inViewOptions);

  return {
    elementRef,
    isVisible: shouldReduceMotion ? true : isInView,
  };
};
