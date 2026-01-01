import { useState, useEffect, useRef } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

// Throttle utility for scroll performance
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return ((...args: any[]) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
};

const useParallax = ({ speed = 0.5, offset = 0 }: UseParallaxOptions = {}) => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        elementRef.current.style.transform = 'none';
        return;
      }

      const yPos = -(scrollY * speed) + offset;
      elementRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }, [scrollY, speed, offset]);

  return elementRef;
};

export default useParallax;