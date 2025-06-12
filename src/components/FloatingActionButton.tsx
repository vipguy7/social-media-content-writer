
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
      className="floating-clay-button flex items-center justify-center tactile-surface animate-tactile-press"
      size="icon"
    >
      <Wand2 className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
};

export default FloatingActionButton;
