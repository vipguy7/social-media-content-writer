
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center space-y-4 mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-8 h-8 text-myanmar-red" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-myanmar-red to-myanmar-red-light bg-clip-text text-transparent">
          မြန်မာ ကွန်တင့် ကျွမ်းကျင်သူ
        </h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        အဆင့်မြင့် မြန်မာဘာသာ ပုံစံများဖြင့် AI စွမ်းအင်ဖြင့် ပရော်ဖက်ရှင်နယ် ဆိုရှယ်မီဒီယာ ကွန်တင့် ဖန်တီးမှု။ 
        မြန်မာ လုပ်ငန်း အောင်မြင်မှုအတွက် ယဉ်ကျေးမှုနှင့် ကိုက်ညီသော ကွန်တင့်နှင့် ကိုက်ညီသော ဂရပ်ဖစ်များ ဖန်တီးပါ။
      </p>
    </div>
  );
};

export default HeroSection;
