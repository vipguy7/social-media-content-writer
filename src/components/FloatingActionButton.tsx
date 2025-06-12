
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
      className="floating-action-btn flex items-center justify-center"
      size="icon"
    >
      <Wand2 className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
};

export default FloatingActionButton;
