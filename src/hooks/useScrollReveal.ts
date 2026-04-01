import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 检查元素是否在视口内
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        setIsVisible(true);
      }
    };

    // 立即检查一次
    checkVisibility();

    // 稍微延迟再检查一次，确保布局完成
    const timeoutId = setTimeout(checkVisibility, 50);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
        ...options,
      }
    );

    observer.observe(element);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}
