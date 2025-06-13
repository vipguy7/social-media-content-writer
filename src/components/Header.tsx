
import { FileText, Users, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 text-foreground clay-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="clay-card p-4 animate-clay-float">
                <img 
                  src="https://tenor.com/brK51.gif" 
                  alt="Animated Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold myanmar-heading text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  လက်ထောက် စာရေးလေး
                </h1>
                <p className="text-muted-foreground text-lg font-english mt-2">
                  AI ဖြင့် မြန်မာဘာသာပိုစ့်များ ရေးသားခြင်း
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-3 clay-card px-4 py-3 hover:clay-elevated transition-all duration-300">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="myanmar-text font-medium text-foreground">ပရော်ဖက်ရှင်နယ် ပိုစ့်</span>
            </div>
            <div className="flex items-center gap-3 clay-card px-4 py-3 hover:clay-elevated transition-all duration-300">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="myanmar-text font-medium text-foreground">ယဉ်ကျေးမှု အလေးပေးမှု</span>
            </div>
            <div className="flex items-center gap-3 clay-card px-4 py-3 hover:clay-elevated transition-all duration-300">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <span className="myanmar-text font-medium text-foreground">ဒေသဆိုင်ရာ ဗဟုသုတ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
