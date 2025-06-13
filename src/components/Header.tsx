
import { FileText, Users, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-background border-b border-border text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <div className="p-3 bg-card border rounded-lg">
              <img
                src="https://media1.tenor.com/m/OrSyAesEiZQAAAAC/lovely-tuji-bunny.gif"
                alt="Animated bunny icon"
                className="w-8 h-8"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold myanmar-heading text-foreground">
                မြန်မာ ကွန်တင့် ကျွမ်းကျင်သူ
              </h1>
              <p className="text-muted-foreground text-lg font-english mt-1">
                Professional Burmese Content Generation Platform
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm animate-slide-in-right">
            <div className="flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
              <FileText className="w-5 h-5 text-primary" />
              <span className="myanmar-text font-medium text-foreground">ပရော်ဖက်ရှင်နယ် ကွန်တင့်</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
              <Users className="w-5 h-5 text-primary" />
              <span className="myanmar-text font-medium text-foreground">ယဉ်ကျေးမှု အလေးပေးမှု</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
              <Globe className="w-5 h-5 text-primary" />
              <span className="myanmar-text font-medium text-foreground">ဒေသဆိုင်ရာ ဗဟုသုတ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
