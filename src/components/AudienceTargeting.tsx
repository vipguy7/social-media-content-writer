import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Target, Heart, Zap } from 'lucide-react';
import { ContentFormData } from '@/types/content';

interface AudienceTargetingProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
}

const AudienceTargeting = ({ formData, updateFormData }: AudienceTargetingProps) => {
  const getAudienceIcon = () => {
    if (formData.targetAudience.toLowerCase().includes('မိန်းမ') || 
        formData.targetAudience.toLowerCase().includes('အမျိုးသမီး')) {
      return <Heart className="w-5 h-5 text-pink-500" />;
    }
    if (formData.targetAudience.toLowerCase().includes('ယောက်ျား') || 
        formData.targetAudience.toLowerCase().includes('အမျိုးသား')) {
      return <Zap className="w-5 h-5 text-blue-500" />;
    }
    return <Users className="w-5 h-5 text-myanmar-red" />;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-myanmar-red" />
          သင့်လုပ်ငန်းအတွက် ပရိသတ် ရွေးချယ်ခြင်း
        </CardTitle>
        <CardDescription>
          သင့်လုပ်ငန်းအတွက် သင့်လျော်သော ပရိသတ်ကို ရွေးချယ်ပါ။
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="audienceGender" className="flex items-center gap-2">
              {getAudienceIcon()}
              ပရိသတ်
            </Label>
            <Select 
              value={formData.targetAudience.includes('အမျိုးသမီး') ? 'female' : 
                     formData.targetAudience.includes('အမျိုးသား') ? 'male' : 'general'} 
              onValueChange={(value) => {
                const audienceMap = {
                  'female': 'အမျိုးသမီးများ',
                  'male': 'အမျိုးသားများ',
                  'general': 'ယေဘုယျ ပရိသတ်'
                };
                updateFormData({ targetAudience: audienceMap[value as keyof typeof audienceMap] });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="ပရိသတ် ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    မိန်းမဆန်သော အရေးအသား (နူးညံ့၊ ယဉ်ကျေးသော အသံ)
                  </div>
                </SelectItem>
                <SelectItem value="male">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    ယောက်ျားဆန်သော အရေးအသား (အားကောင်း၊ ရဲရင့်သော အသံ)
                  </div>
                </SelectItem>
                <SelectItem value="general">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    ယေဘုယျ ပရိသတ် (မျှတသော အသံ)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageGroup">အသက်အုပ်စု</Label>
            <Select onValueChange={(value) => {
              const currentAudience = formData.targetAudience;
              const ageAudience = currentAudience.split('(')[0].trim() + ` (${value})`;
              updateFormData({ targetAudience: ageAudience });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="အသက်အုပ်စု ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="လူငယ် ၁၈-၂၅">လူငယ် (၁၈-၂၅ နှစ်)</SelectItem>
                <SelectItem value="လူလတ်ပိုင်း ၂၆-৩৫">လူလတ်ပိုင်း (၂၆-৩৫ နှစ်)</SelectItem>
                <SelectItem value="အရွယ်ရောက် ၃၆-၄၅">အရွယ်ရောက် (၃၆-၄၅ နှစ်)</SelectItem>
                <SelectItem value="အလယ်အလတ် ၄၆-၅၅">အလယ်အလတ် (၄၆-၅၅ နှစ်)</SelectItem>
                <SelectItem value="အကြီးအကဲ ၅၆+">သက်ကြီးပိုင်း (၅၆+ နှစ်)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="detailedAudience">အသေးစိတ် ဖော်ပြချက်</Label>
          <Textarea
            id="detailedAudience"
            value={formData.targetAudience}
            onChange={(e) => updateFormData({ targetAudience: e.target.value })}
            placeholder="ဥပမာ - ရန်ကုန်မြို့ရှိ အမျိုးသမီး လူငယ် ပရော်ဖက်ရှင်နယ်များ၊ လှပမှုကို ဂရုစိုက်သူများ"
            rows={3}
            className="focus:ring-myanmar-red focus:border-myanmar-red"/>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceTargeting;
