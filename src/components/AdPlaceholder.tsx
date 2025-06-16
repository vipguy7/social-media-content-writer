
import React from 'react';

interface AdPlaceholderProps {
  width: string;
  height: string;
  label: string;
  className?: string;
}

const AdPlaceholder = ({ width, height, label, className }: AdPlaceholderProps) => {
  return (
    <div
      className={`bg-secondary/80 border-2 border-dashed border-border flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-200 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <p className="text-foreground font-bold text-lg tracking-wide mb-1">{label}</p>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Advertisement</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
