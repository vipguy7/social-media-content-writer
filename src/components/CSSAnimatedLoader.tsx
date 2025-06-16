
import React from 'react';

const CSSAnimatedLoader = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Animated dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Animated text */}
      <div className="text-center">
        <div className="text-lg font-semibold text-primary-foreground animate-pulse">
          ရေးသားပေးနေပါပြီ
        </div>
        <div className="flex items-center justify-center mt-1">
          <div className="w-8 h-1 bg-primary-foreground/30 rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary-foreground rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSAnimatedLoader;
