
import { Sparkles, Zap, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center space-y-8 mb-16 animate-fade-in">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="clay-card p-6 animate-clay-float">
          <Sparkles className="w-12 h-12 text-foreground animate-clay-pulse" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold myanmar-heading bg-gradient-to-br from-foreground via-accent to-foreground/70 bg-clip-text text-transparent">
          စာရေးလေး
        </h1>
      </div>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto myanmar-text leading-relaxed clay-surface p-6">
       မြန်မာဆိုရှယ်မီဒီယာပိုစ့်တွေရေးဖို့ AI လက်ထောက်စာရေးလေးပါခင်ဗျာ. 
       မြန်မာယဉ်ကျေးမှုနှင့် ကိုက်ညီတဲ့ ပိုစ့်တွေကို အကန့်အသတ်မရှိ ကူညီရေးသားပေးနိုင်ပါတယ်။
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
        <div className="clay-card p-8 text-center group hover:clay-elevated transition-all duration-500">
          <div className="clay-card p-4 bg-gradient-to-br from-foreground/10 to-accent/10 rounded-2xl w-fit mx-auto mb-6 group-hover:animate-clay-bounce">
            <Zap className="w-10 h-10 text-foreground" />
          </div>
          <h3 className="font-bold text-xl myanmar-heading text-foreground mb-4">
            မြန်ဆန်သော ရေးသားမှု
          </h3>
          <p className="text-muted-foreground myanmar-text leading-relaxed">
            စက္ကန့်ပိုင်းအတွင်း ပရော်ဖက်ရှင်နယ်ပိုစ့်များကို ရေးသားလိုက်ပါ
          </p>
        </div>

        <div className="clay-card p-8 text-center group hover:clay-elevated transition-all duration-500">
          <div className="clay-card p-4 bg-gradient-to-br from-foreground/10 to-accent/10 rounded-2xl w-fit mx-auto mb-6 group-hover:animate-clay-bounce">
            <Target className="w-10 h-10 text-foreground" />
          </div>
          <h3 className="font-bold text-xl myanmar-heading text-foreground mb-4">
            ရည်မှန်းပရိသတ်နှင့် ကိုက်ညီမှု
          </h3>
          <p className="text-muted-foreground myanmar-text leading-relaxed">
            သင့်ပရိသတ်အတွက် အထူးပြုရေးသားလိုက်ပါ
          </p>
        </div>

        <div className="clay-card p-8 text-center group hover:clay-elevated transition-all duration-500">
          <div className="clay-card p-4 bg-gradient-to-br from-foreground/10 to-accent/10 rounded-2xl w-fit mx-auto mb-6 group-hover:animate-clay-bounce">
            <Sparkles className="w-10 h-10 text-foreground" />
          </div>
          <h3 className="font-bold text-xl myanmar-heading text-foreground mb-4">
            ယဉ်ကျေးမှု သင့်လျော်မှု
          </h3>
          <p className="text-muted-foreground myanmar-text leading-relaxed">
            မြန်မာယဉ်ကျေးမှုနှင့် လိုက်လျောညီထွေစွာ ရေးသားလိုက်ပါ
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
