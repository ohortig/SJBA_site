import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Reset scroll position on initial mount (first page load)
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Immediate scroll reset for first page load
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
    window.pageYOffset = 0;
  }, []); // Empty dependency array = runs only on mount

  // Reset scroll position on route changes
  useLayoutEffect(() => {
    // Multiple immediate, synchronous scroll resets to ensure it works
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
    // Immediate fallback
    window.pageYOffset = 0;
  }, [pathname]); // Runs on pathname changes

  return null;
};