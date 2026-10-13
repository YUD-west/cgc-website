import React, { useMemo } from 'react';
import { createQRCodeMatrix } from '../utils/qrCode';

interface QRCodeViewProps {
  value: string;
  size?: number;
  className?: string;
  label?: string;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  value,
  size = 140,
  className = '',
  label
}) => {
  const matrix = useMemo(() => {
    try {
      return createQRCodeMatrix(value);
    } catch (e) {
      console.warn('Failed to generate QR matrix:', e);
      return [];
    }
  }, [value]);

  if (!matrix.length) return null;

  const count = matrix.length;
  const padding = 2; // quiet zone
  const viewBoxSize = count + padding * 2;

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200 inline-block">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          width={size}
          height={size}
          className="shape-rendering-crispEdges block"
          style={{ shapeRendering: 'crispEdges' }}
          role="img"
          aria-label={label || `QR code for ${value}`}
        >
          <rect width={viewBoxSize} height={viewBoxSize} fill="#FFFFFF" />
          {matrix.map((row, r) =>
            row.map((isDark, c) => {
              if (!isDark) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c + padding}
                  y={r + padding}
                  width="1"
                  height="1"
                  fill="#0F172A"
                />
              );
            })
          )}
        </svg>
      </div>
      {label && (
        <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
          {label}
        </span>
      )}
    </div>
  );
};
