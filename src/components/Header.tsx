
import { Sparkles, FileText, Users, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-myanmar-gray-light border-b-4 border-myanmar-orange text-black shadow-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <div className="p-3 bg-white border-2 border-myanmar-orange rounded-xl shadow-md">
              <Sparkles className="w-8 h-8 text-myanmar-orange animate-glow" />
            </div>
            <div>
              <h1 className="text-3xl font-bold myanmar-heading text-black">
                မြန်မာ ကွန်တင့် ကျွမ်းကျင်သူ
              </h1>
              <p className="text-myanmar-gray text-lg font-english mt-1">
                Professional Burmese Content Generation Platform
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm animate-slide-in-right">
            <div className="flex items-center gap-3 p-3 bg-white border-2 border-myanmar-orange rounded-xl shadow-md typewriter-key">
              <FileText className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium text-black">ပရော်ဖက်ရှင်နယ် ကွန်တင့်</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white border-2 border-myanmar-orange rounded-xl shadow-md typewriter-key">
              <Users className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium text-black">ယဉ်ကျေးမှု အလေးပေးမှု</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white border-2 border-myanmar-orange rounded-xl shadow-md typewriter-key">
              <Globe className="w-5 h-5 text-myanmar-orange" />
              <span className="myanmar-text font-medium text-black">ဒေသဆိုင်ရာ ဗဟုသုတ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
