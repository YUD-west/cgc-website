import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 6)
  scale?: number; // Scale on hover (default: 1.015)
  glare?: boolean; // Enable dynamic specular light glare (default: true)
  glareOpacity?: number; // Max glare opacity (default: 0.12)
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.015,
  glare = true,
  glareOpacity = 0.12,
  onClick,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<{
    transform: string;
    glareX: number;
    glareY: number;
    isHovered: boolean;
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles: mouse top tilts up (-rotateX), mouse right tilts right (+rotateY)
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        glareX,
        glareY,
        isHovered: true,
      });
    },
    [isTouchDevice, maxTilt, scale]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  }, [isTouchDevice]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ease-out will-change-transform ${
        onClick ? 'cursor-pointer active:scale-[0.98]' : ''
      } ${className}`}
      style={{
        ...style,
        transform: isTouchDevice ? undefined : tiltStyle.transform,
        transition: tiltStyle.isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Specular Glare Overlay */}
      {glare && !isTouchDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-inherit transition-opacity duration-300"
          style={{
            opacity: tiltStyle.isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 320px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(255, 255, 255, 0.35), transparent 75%)`,
          }}
        />
      )}

      {/* Subtle top edge specular highlight line */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" 
      />

      {children}
    </div>
  );
};
