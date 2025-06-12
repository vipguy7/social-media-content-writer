
import { Sparkles, Zap, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center space-y-8 mb-16 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-4 bg-white border-2 border-myanmar-orange rounded-2xl shadow-lg animate-glow typewriter-key">
          <Sparkles className="w-10 h-10 text-myanmar-orange" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold myanmar-heading bg-gradient-to-r from-black via-myanmar-gray to-myanmar-orange bg-clip-text text-transparent">
          မြန်မာ ကွန်တင့် ကျွမ်းကျင်သူ
        </h1>
      </div>
      
      <p className="text-xl md:text-2xl text-myanmar-gray max-w-4xl mx-auto myanmar-text leading-relaxed">
        အဆင့်မြင့် AI နည်းပညာဖြင့် ပရော်ဖက်ရှင်နယ် မြန်မာဘာသာ ဆိုရှယ်မီဒီယာ ကွန်တင့်များ ဖန်တီးပါ။ 
        မြန်မာ လုပ်ငန်း အောင်မြင်မှုအတွက် ယဉ်ကျေးမှုနှင့် ကိုက်ညီသော ဘရန်းအသံဖြင့် ဖန်တီးပေးပါမည်။
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="floating-card p-6 text-center group typewriter-key">
          <div className="p-3 bg-myanmar-orange/10 border border-myanmar-orange rounded-xl w-fit mx-auto mb-4 group-hover:bg-myanmar-orange/20 transition-colors">
            <Zap className="w-8 h-8 text-myanmar-orange" />
          </div>
          <h3 className="font-bold text-lg myanmar-heading text-black mb-2">
            လျင်မြန်သော ဖန်တီးမှု
          </h3>
          <p className="text-myanmar-gray myanmar-text">
            စက္ကန့်ပိုင်းအတွင်း ပရော်ဖက်ရှင်နယ် ကွန်တင့်များ ရရှိပါ
          </p>
        </div>

        <div className="floating-card p-6 text-center group typewriter-key">
          <div className="p-3 bg-myanmar-orange/10 border border-myanmar-orange rounded-xl w-fit mx-auto mb-4 group-hover:bg-myanmar-orange/20 transition-colors">
            <Target className="w-8 h-8 text-myanmar-orange" />
          </div>
          <h3 className="font-bold text-lg myanmar-heading text-black mb-2">
            ပစ်မှတ် ပရိသတ် ထိရောက်မှု
          </h3>
          <p className="text-myanmar-gray myanmar-text">
            သင့်ပရိသတ်နှင့် အံဝင်ခွင်ကျ ဖန်တီးပေးပါမည်
          </p>
        </div>

        <div className="floating-card p-6 text-center group typewriter-key">
          <div className="p-3 bg-myanmar-orange/10 border border-myanmar-orange rounded-xl w-fit mx-auto mb-4 group-hover:bg-myanmar-orange/20 transition-colors">
            <Sparkles className="w-8 h-8 text-myanmar-orange" />
          </div>
          <h3 className="font-bold text-lg myanmar-heading text-black mb-2">
            ယဉ်ကျေးမှု သင့်လျော်မှု
          </h3>
          <p className="text-myanmar-gray myanmar-text">
            မြန်မာယဉ်ကျေးမှုနှင့် အပြည့်အဝ ကိုက်ညီပါသည်
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
