import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Wand2, Facebook } from 'lucide-react';
import { ContentFormData } from '@/types/content';
import AudienceTargeting from './AudienceTargeting';
import MarketingInsights from './MarketingInsights';

interface ContentFormConfigProps {
  formData: ContentFormData;
  setFormData: (data: ContentFormData) => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasContent: boolean;
}

const ContentFormConfig = ({ 
  formData, 
  setFormData, 
  onGenerate, 
  isLoading, 
  hasContent 
}: ContentFormConfigProps) => {
  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-7 h-7 text-myanmar-red drop-shadow-glow" />
          <span>ပိုစ့်အမျိုးအစားရွေးပါ၊ </span>
        </CardTitle>
        <CardDescription className="font-medium text-base">
          သင့် Facebook ပိုစ့် သို့မဟုတ် TikTok ဗီဒီယိုအတွက် ပိုစ့်ရေးသားပေးနိုင်ရန် လိုအပ်သော အချက်အလက်များကို ဖြည့်ပါ။
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Platform and Content Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="platform">ပလပ်ဖောင်း 
              <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 font-semibold">NEW</span>
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
            <p className="text-caption text-muted-foreground mt-1">
              Facebook ပိုစ့်အတွက် အဆင်သင့်သုံး စာသား ။ TikTok ဗီဒီယိုအတွက် စကားပြောscript!
            </p>
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

        {/* Product Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">ထုတ်ကုန်/ဝန်ဆောင်မှု အမည် *</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              placeholder="သင့်ထုတ်ကုန် သို့မဟုတ် လုပ်ငန်းအမည်ကို ထည့်ပါ"
              className="focus:ring-myanmar-red focus:border-myanmar-red"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyMessage">အဓိက မက်ဆေ့ခ် *</Label>
            <Textarea
              id="keyMessage"
              value={formData.keyMessage}
              onChange={(e) => updateFormData({ keyMessage: e.target.value })}
              placeholder="အဓိက ဘာပြောချင်တာလဲ?"
              rows={3}
              className="focus:ring-myanmar-red focus:border-myanmar-red"
            />
          </div>

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
        </div>

        {/* Audience Targeting Component */}
        <AudienceTargeting 
          formData={formData} 
          updateFormData={updateFormData}
        />

        {/* Brand Voice and Pronouns */}
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

        {/* Style and Target Audience */}
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

        {/* Keywords */}
        <div className="space-y-2">
          <Label htmlFor="keywords">အဓိက စကားလုံးများ</Label>
          <Input
            id="keywords"
            value={formData.keywords}
            onChange={(e) => updateFormData({ keywords: e.target.value })}
            placeholder="ဥပမာ - မြန်မာ, အရည်အသွေး, ဝန်ဆောင်မှု"
          />
        </div>

        {/* Content Options */}
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

        {/* Number of Variations */}
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

        {/* Generate Buttons */}
        <div className="space-y-4">
          <Button
            onClick={onGenerate}
            disabled={isLoading || !formData.productName.trim() || !formData.keyMessage.trim()}
            className="w-full myanmar-gradient hover:opacity-90 transition-opacity text-lg py-6"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <img
                  src="https://media1.tenor.com/m/zXhK-0R9y1gAAAAC/vengeful-notes.gif"
                  alt="Generating content animation..."
                  className="h-12 w-auto mx-auto mb-2"
                />
                <span>ရေးသားပေးနေပါပြီ</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                ပိုစ့်ရေးပါ
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFormConfig;
