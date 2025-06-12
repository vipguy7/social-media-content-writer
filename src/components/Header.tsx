
import { Sparkles, FileText, Users, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="myanmar-gradient text-white shadow-2xl shadow-blue-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-myanmar-orange animate-glow" />
            </div>
            <div>
              <h1 className="text-3xl font-bold myanmar-heading">
                မြန်မာ ကွန်တင့် ကျွမ်းကျင်သူ
              </h1>
              <p className="text-white/80 text-lg font-english mt-1">
                Professional Burmese Content Generation Platform
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm animate-slide-in-right">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <FileText className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium">ပရော်ဖက်ရှင်နယ် ကွန်တင့်</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Users className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium">ယဉ်ကျေးမှု အလေးပေးမှု</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Globe className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium">ဒေသဆိုင်ရာ ဗဟုသုတ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
