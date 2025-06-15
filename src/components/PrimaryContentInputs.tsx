
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ContentFormData } from '@/types/content';

interface PrimaryContentInputsProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
}

const PrimaryContentInputs = ({ formData, updateFormData }: PrimaryContentInputsProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="platform">ပလပ်ဖောင်း 
            <span className="ml-2 rounded bg-accent/20 px-2 py-0.5 text-xs text-accent font-semibold">NEW</span>
          </Label>
          <Select value={formData.platform} onValueChange={(value) => updateFormData({ platform: value })}>
            <SelectTrigger>
              <SelectValue placeholder="ပလပ်ဖောင်း ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facebook">
                <span className="flex items-center gap-2">
                  <img src="/facebook_logo.png" alt="Facebook" className="w-4 h-4 inline-block"/> Facebook (ပုံမှန် ပိုစ့်)
                </span>
              </SelectItem>
              <SelectItem value="tiktok">
                <span className="flex items-center gap-2">
                  <img src="/tiktok_logo.png" alt="TikTok" className="w-4 h-4 inline-block"/> TikTok (ဗီဒီယို Script)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contentType">ပိုစ့်အမျိုးအစား</Label>
          <Select value={formData.contentType} onValueChange={(value) => updateFormData({ contentType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="ပိုစ့်အမျိုးအစား ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="promotional">ကြော်ငြာ ပိုစ့်</SelectItem>
              <SelectItem value="educational">ထုတ်ကုန်/လုပ်ငန်း အကြောင်းအရာ ပိုစ့်</SelectItem>
              <SelectItem value="entertaining">ဖျော်ဖြေ်ရေးဆန်သော ပိုစ့်</SelectItem>
              <SelectItem value="news">Press Release</SelectItem>
              <SelectItem value="community">အားပေးသူ တိုးလာစေချင်တဲ့ ပိုစ့်</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productName">ထုတ်ကုန်/ဝန်ဆောင်မှု အမည် *</Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) => updateFormData({ productName: e.target.value })}
            placeholder="ထုတ်ကုန် သို့မဟုတ် လုပ်ငန်းအမည်ကို ထည့်ပါ"
            className="focus:ring-myanmar-red focus:border-myanmar-red"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyMessage">ရေးသားလိုသည့် အကြောင်းအရာ*</Label>
          <Textarea
            id="keyMessage"
            value={formData.keyMessage}
            onChange={(e) => updateFormData({ keyMessage: e.target.value })}
            placeholder="သင့်ရဲ့ ဘယ်လို ထုတ်ကုန်/ဝန်ဆောင်မှု/လုပ်ငန်း အကြောင်း ကြော်ငြာချင်သလဲဆိုတာ အစအဆုံးရေးစရာမလိုဘဲ အဓိက စကားလုံးစုများကို ကော်မာခံပြီးရေးပေးပါ. ဥပမာ - အသားဖြူချင်သူများအတွက်,ထုတ်ကုန်အသစ်,သဘာဝပစွည်းများဖြင့်သာထုတ်လုပ်"
            rows={3}
            className="focus:ring-myanmar-red focus:border-myanmar-red"
          />
        </div>
      </div>
    </>
  );
};

export default PrimaryContentInputs;
