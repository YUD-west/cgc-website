import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // How far the button follows the cursor in pixels (default: 4)
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 4,
  className = '',
  onClick,
  disabled,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isTouchDevice || disabled || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Normalize to strength
      const moveX = (x / (rect.width / 2)) * strength;
      const moveY = (y / (rect.height / 2)) * strength;

      setOffset({ x: moveX, y: moveY });
      setIsHovered(true);
    },
    [disabled, isTouchDevice, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, [isTouchDevice]);

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-transform duration-200 active:scale-95 will-change-transform ${className}`}
      style={{
        transform: isTouchDevice
          ? undefined
          : `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
