
import { Sparkles, FileText, Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="myanmar-gradient text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Myanmar Content Crafter</h1>
              <p className="text-primary-foreground/80 text-sm">AI-Powered Burmese Content Generation</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Professional Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Cultural Relevance</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
