import { useState, useEffect, useRef, useCallback } from 'react';

export function useInView({ triggerOnce = true, threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasTriggered = useRef(false);

  const callbackFn = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setInView(true);
      if (triggerOnce) hasTriggered.current = true;
    } else if (!triggerOnce) {
      setInView(false);
    }
  }, [triggerOnce]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (hasTriggered.current) return;

    const observer = new IntersectionObserver(callbackFn, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [callbackFn, threshold]);

  return [ref, inView];
}
