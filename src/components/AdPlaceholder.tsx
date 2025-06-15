
import React from 'react';

interface AdPlaceholderProps {
  width: string; // Use string for responsive widths like '100%'
  height: string;
  label: string;
  className?: string;
}

const AdPlaceholder = ({ width, height, label, className }: AdPlaceholderProps) => {
  return (
    <div
      className={`bg-muted/50 border-2 border-dashed border-border flex items-center justify-center rounded-lg ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <p className="text-muted-foreground/80 font-bold text-lg tracking-wider">{label}</p>
        <p className="text-muted-foreground/60 text-sm uppercase">Advertisement</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
