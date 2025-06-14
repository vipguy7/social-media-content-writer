
import KnowledgeBasePanel from "@/components/KnowledgeBasePanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const KnowledgeBasePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff6fa] to-[#f2f9fd] flex flex-col items-center pt-12">
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-9 h-9 text-myanmar-red drop-shadow-glow animate-bounce" />
          <h1 className="text-3xl font-extrabold text-myanmar-red text-center underline decoration-double underline-offset-8 mb-1">
            Content Strategy Knowledge Hub
          </h1>
        </div>
        <p className="mb-5 text-center text-lg text-gray-700 max-w-xl">
          အောင်မြင်သည့် Facebook နှင့် TikTok ပိုစ့်များရေးသားခြင်းအတွက် <span className="font-semibold text-myanmar-red">မြန်မာလူမျိုး</span> အတွက် လိုအပ်သော မားကတ်တင်း၊ လုပ်ငန်း၊ ဗဟုအသုံး များစွာကို ဝေမျှပေးထားပါတယ်။
        </p>
        <KnowledgeBasePanel />
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            မူလစာမျက်နှာသို့ ပြန်သွားရန်
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KnowledgeBasePage;
