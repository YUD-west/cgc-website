import React, { useRef, useState, useEffect } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number; // Stagger delay in milliseconds
  threshold?: number; // Intersection threshold (default 0.1)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.1,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
      case 'down':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6';
      case 'left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6';
      case 'right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6';
      case 'none':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${getDirectionClasses()} ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};
