import { Sparkles, Zap, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center space-y-8 mb-16 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-4 bg-card border rounded-lg animate-float">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-display myanmar-heading bg-gradient-to-r from-foreground via-muted-foreground to-primary bg-clip-text text-solid text-balance">
          စာရေးလေး
        </h1>
      </div>
      
      <p className="text-h3 text-muted-foreground max-w-4xl mx-auto myanmar-text leading-relaxed text-balance">
       မြန်မာဆိုရှယ်မီဒီယာပိုစ့်တွေရေးဖို့ AI လက်ထောက်စာရေးလေးပါခင်ဗျာ. 
       မြန်မာယဉ်ကျေးမှုနှင့် ကိုက်ညီတဲ့ ပိုစ့်တွေကို အကန့်အသတ်မရှိ ကူညီရေးသားပေးနိုင်ပါတယ်။
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="p-6 text-center group bg-card border rounded-lg hover:bg-muted transition-all duration-300">
          <div className="p-3 bg-muted rounded-xl w-fit mx-auto mb-4 group-hover:bg-accent transition-colors">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-bold text-lg myanmar-heading text-foreground mb-2">
            မြန်ဆန်သော ရေးသားမှု
          </h3>
          <p className="text-muted-foreground myanmar-text">
            စက္ကန့်ပိုင်းအတွင်း ပရော်ဖက်ရှင်နယ်ပိုစ့်များကို ရေးသားလိုက်ပါ
          </p>
        </div>

        <div className="p-6 text-center group bg-card border rounded-lg hover:bg-muted transition-all duration-300">
          <div className="p-3 bg-muted rounded-xl w-fit mx-auto mb-4 group-hover:bg-accent transition-colors">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-bold text-lg myanmar-heading text-foreground mb-2">
            ရည်မှန်းပရိသတ်နှင့် ကိုက်ညီမှု
          </h3>
          <p className="text-muted-foreground myanmar-text">
            သင့်ပရိသတ်အတွက် အထူးပြုရေးသားလိုက်ပါ
          </p>
        </div>

        <div className="p-6 text-center group bg-card border rounded-lg hover:bg-muted transition-all duration-300">
          <div className="p-3 bg-muted rounded-xl w-fit mx-auto mb-4 group-hover:bg-accent transition-colors">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-bold text-xl myanmar-heading text-foreground mb-2">
            ယဉ်ကျေးမှု သင့်လျော်မှု
          </h3>
          <p className="text-muted-foreground myanmar-text">
            မြန်မာယဉ်ကျေးမှုနှင့် လိုက်လျောညီထွေစွာ ရေးသားလိုက်ပါ
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
