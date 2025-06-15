
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Facebook } from 'lucide-react';
import { ContentFormData } from '@/types/content';
import AudienceTargeting from './AudienceTargeting';

interface AdvancedContentOptionsProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
}

const AdvancedContentOptions = ({ formData, updateFormData }: AdvancedContentOptionsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="facebookPageLink" className="flex items-center gap-2">
          <Facebook className="w-4 h-4 text-blue-600" />
          Facebook Page လင့်ခ်
        </Label>
        <Input
          id="facebookPageLink"
          value={formData.facebookPageLink}
          onChange={(e) => updateFormData({ facebookPageLink: e.target.value })}
          placeholder="https://facebook.com/yourpage (ဘရန်းခွဲခြမ်းစိတ်ဖြာမှုအတွက်)"
          className="focus:ring-myanmar-red focus:border-myanmar-red"
        />
        <p className="text-caption text-muted-foreground">
          သင့် Facebook Page လင့်ခ်ကို ထည့်ပါ။ AI သည် သင့်ဘရန်း၏ စာရေးပုံစံ၊ အပြုအမူနှင့် ပရိသတ်တုံ့ပြန်မှုများကို ခွဲခြမ်းစိတ်ဖြာ၍ ပိုမိုက်ညီသော ပိုစ့်များ ဖန်တီးပေးပါမည်။
        </p>
      </div>

      <AudienceTargeting 
        formData={formData} 
        updateFormData={updateFormData}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brandGender">ကိုယ်စားပြုနာမ်ရွေးရန်</Label>
          <Select value={formData.brandGender || ''} onValueChange={(value) => updateFormData({ brandGender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="ကိုယ်စားပြုနာမ်ရွေးပါ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">ယောက်ျား (ကျွန်တော်၊ သူ)</SelectItem>
              <SelectItem value="female">မိန်းမ (ကျွန်မ၊ သူမ)</SelectItem>
              <SelectItem value="neutral">နပုန်းနာမ် (ကျွန်ုပ်၊ ကျွန်တော်တို့)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-caption text-muted-foreground">
            လုပ်ငန်းအမည် ကိုယ်စားပြုနာမ်အရ သင့်လျော်သော စကားလုံးများ အသုံးပြုပါမည်
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">မားကတ်တင်း ရည်ရွယ်ချက်</Label>
          <Select value={formData.objective} onValueChange={(value) => updateFormData({ objective: value })}>
            <SelectTrigger>
              <SelectValue placeholder="ရည်ရွယ်ချက် ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">လုပ်ငန်းကို လူများများသိစေချင်</SelectItem>
              <SelectItem value="engagement">ပရိသတ်တွေဆီ like/comment လိုချင်</SelectItem>
              <SelectItem value="conversion">ကြော်ငြာကနေ တစ်ခါတည်းဝယ်စေချင်</SelectItem>
              <SelectItem value="retention">ဖောက်သည်တွေကိုပဲ အသိပေးချင်</SelectItem>
              <SelectItem value="traffic">ကိုယ့်ပိုစ့်ကို ပရိသတ်များများ ဖတ်စေချင်</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="style">အရေးအသားပုံစံ</Label>
          <Select value={formData.style} onValueChange={(value) => updateFormData({ style: value })}>
            <SelectTrigger>
              <SelectValue placeholder="ပုံစံ ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">ပရော်ဖက်ရှင်နယ်</SelectItem>
              <SelectItem value="casual">ပေါ့ပေါ့ပါးပါး</SelectItem>
              <SelectItem value="friendly">ဖော်ရွေ</SelectItem>
              <SelectItem value="authoritative">ရုံးစာဆန်သော</SelectItem>
              <SelectItem value="playful">ဟာသဆန်သော</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">ရည်မှန်းလိုသည့် ပရိသတ်</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => updateFormData({ targetAudience: e.target.value })}
            placeholder="ဥပမာ - ရန်ကုန်မြို့ရှိ လူငယ် ပရော်ဖက်ရှင်နယ်များ"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">အဓိက စကားလုံးများ</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => updateFormData({ keywords: e.target.value })}
          placeholder="ဥပမာ - မြန်မာ, အရည်အသွေး, ဝန်ဆောင်မှု"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">ပိုစ့် အင်္ဂါရပ်များ</Label>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label htmlFor="includeCTA" className="text-sm">လုပ်ဆောင်ချက် တောင်းဆိုမှု</Label>
            <Switch
              id="includeCTA"
              checked={formData.includeCTA}
              onCheckedChange={(checked) => updateFormData({ includeCTA: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label htmlFor="includeEmojis" className="text-sm">အီမိုဂျီများ</Label>
            <Switch
              id="includeEmojis"
              checked={formData.includeEmojis}
              onCheckedChange={(checked) => updateFormData({ includeEmojis: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label htmlFor="includeHashtags" className="text-sm">Hashtag များ</Label>
            <Switch
              id="includeHashtags"
              checked={formData.includeHashtags}
              onCheckedChange={(checked) => updateFormData({ includeHashtags: checked })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center justify-between">
          ရွေးချယ်စရာ အရေအတွက်
          <span className="text-myanmar-red font-medium">{formData.numVariations}</span>
        </Label>
        <Slider
          value={[formData.numVariations]}
          onValueChange={(value) => updateFormData({ numVariations: value[0] })}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
      </div>
    </>
  );
};

export default AdvancedContentOptions;
