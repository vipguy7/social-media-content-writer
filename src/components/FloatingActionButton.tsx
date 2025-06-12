
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const FloatingActionButton = ({ onClick, isLoading = false }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="fixed bottom-8 right-8 w-16 h-16 sm:bottom-6 sm:right-6 sm:w-14 sm:h-14 bg-primary text-primary-foreground rounded-full z-50 shadow-xl flex items-center justify-center"
      size="icon"
    >
      <Wand2 className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
};

export default FloatingActionButton;
