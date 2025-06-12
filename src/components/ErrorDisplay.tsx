
interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive animate-slide-up">
      <p className="font-medium">အမှား: {error}</p>
    </div>
  );
};

export default ErrorDisplay;
