
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg relative animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card
      >
        <CardHeader className="text-center">
          <CardTitle>Content Generated Successfully!</CardTitle>
          <CardDescription>Please support us by viewing this ad.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <AdPlaceholder
            width="100%"
            height="250px"
            label="300x250 Ad"
            className="max-w-[300px]"
          />
          <Button onClick={onClose}>
            Skip Ad & View Content
          </Button>
        </CardContent>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full"
          aria-label="Close ad"
        >
          <X className="w-5 h-5" />
        </Button>
      </Card>
    </div>
  );
};

export default InterstitialAd;
