
import React from 'react';
import AdPlaceholder from './AdPlaceholder';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface InterstitialAdProps {
  onClose: () => void;
}

const InterstitialAd = ({ onClose }: InterstitialAdProps) => {
  // Prevent background scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg relative animate-scale-in glass-card border-2"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-foreground font-semibold text-xl">
            Content Generated Successfully!
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Please support us by viewing this ad.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6">
          <AdPlaceholder
            width="100%"
            height="250px"
            label="300x250 Ad"
            className="max-w-[300px] border-2 border-border"
          />
          <Button 
            onClick={onClose}
            className="btn-visible px-8 py-3 text-base font-semibold rounded-lg"
          >
            Skip Ad & View Content
          </Button>
        </CardContent>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full hover:bg-secondary text-foreground"
          aria-label="Close ad"
        >
          <X className="w-5 h-5" />
        </Button>
      </Card>
    </div>
  );
};

export default InterstitialAd;
