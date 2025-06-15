
import { Sparkles } from "lucide-react";

const AnimatedLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/80 via-blue-200 to-yellow-100 animate-fade-in">
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center animate-float mb-8">
          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <div className="text-2xl font-bold text-primary tracking-wide animate-pulse-fast">
          Myanmar Content Crafter
        </div>
        <div className="mt-2 text-base text-muted-foreground text-center max-w-xs">
          Loading your content creator...
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
