
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Wand2, Sparkles, Facebook } from 'lucide-react';
import { ContentFormData } from '@/pages/Index';

interface ContentFormConfigProps {
  formData: ContentFormData;
  setFormData: (data: ContentFormData) => void;
  onGenerate: () => void;
  onGenerateImages: () => void;
  isLoading: boolean;
  isGeneratingImages: boolean;
  hasContent: boolean;
}

const ContentFormConfig = ({ 
  formData, 
  setFormData, 
  onGenerate, 
  onGenerateImages,
  isLoading, 
  isGeneratingImages,
  hasContent 
}: ContentFormConfigProps) => {
  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-myanmar-red" />
          ကွန်တင့် ဖွဲ့စည်းမှု
        </CardTitle>
        <CardDescription>
          ပရော်ဖက်ရှင်နယ် မြန်မာ ဆိုရှယ်မီဒီယာ ပို့စ်များ ဖန်တီးရန် သင့်ကွန်တင့် ပြင်းထန်ခဲ့ချက်များကို သတ်မှတ်ပါ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Platform and Content Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="platform">ပလပ်ဖောင်း</Label>
            <Select value={formData.platform} onValueChange={(value) => updateFormData({ platform: value })}>
              <SelectTrigger>
                <SelectValue placeholder="ပလပ်ဖောင်း ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">ကွန်တင့်အမျိုးအစား</Label>
            <Select value={formData.contentType} onValueChange={(value) => updateFormData({ contentType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="ကွန်တင့်အမျိုးအစား ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promotional">ကြော်ငြာ</SelectItem>
                <SelectItem value="educational">ပညာရေး</SelectItem>
                <SelectItem value="entertaining">ဖျော်ဖြေရေး</SelectItem>
                <SelectItem value="news">သတင်းနှင့် အပ်ဒိတ်များ</SelectItem>
                <SelectItem value="community">အသိုင်းအဝိုင်း တည်ဆောက်ရေး</SelectItem>
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
              placeholder="သင့်ထုတ်ကုန် သို့မဟုတ် ဝန်ဆောင်မှု အမည်ကို ထည့်ပါ"
              className="focus:ring-myanmar-red focus:border-myanmar-red"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyMessage">အဓိက မက်ဆေ့ခ် *</Label>
            <Textarea
              id="keyMessage"
              value={formData.keyMessage}
              onChange={(e) => updateFormData({ keyMessage: e.target.value })}
              placeholder="သင် ပေးပို့လိုသော အဓိက မက်ဆေ့ခ်မှာ ဘာလဲ?"
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
            <p className="text-xs text-muted-foreground">
              သင့် Facebook Page လင့်ခ်ကို ထည့်ပါ။ AI သည် သင့်ဘရန်း၏ စာရေးပုံစံ၊ အပြုအမူနှင့် ပရိသတ်တုံ့ပြန်မှုများကို ခွဲခြမ်းစိတ်ဖြာ၍ ပိုမိုကိုက်ညီသော ကွန်တင့်များ ဖန်တီးပေးပါမည်။
            </p>
          </div>
        </div>

        {/* Style and Objectives */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="objective">မားကတ်တင်း ရည်ရွယ်ချက်</Label>
            <Select value={formData.objective} onValueChange={(value) => updateFormData({ objective: value })}>
              <SelectTrigger>
                <SelectValue placeholder="ရည်ရွယ်ချက် ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">ဘရန်း သိရှိမှု</SelectItem>
                <SelectItem value="engagement">ပရိသတ် ပါဝင်မှု</SelectItem>
                <SelectItem value="conversion">ရောင်းချမှု ပြောင်းလဲမှု</SelectItem>
                <SelectItem value="retention">ဖောက်သည် ထိန်းသိမ်းမှု</SelectItem>
                <SelectItem value="traffic">ဝက်ဘ်ဆိုက် လည်ပတ်မှု</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">စာရေးပုံစံ</Label>
            <Select value={formData.style} onValueChange={(value) => updateFormData({ style: value })}>
              <SelectTrigger>
                <SelectValue placeholder="ပုံစံ ရွေးချယ်ပါ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">ပရော်ဖက်ရှင်နယ်</SelectItem>
                <SelectItem value="casual">ပေါ့ပေါ့ပါးပါး</SelectItem>
                <SelectItem value="friendly">ဖော်ရွေ</SelectItem>
                <SelectItem value="authoritative">အခွင့်အာဏာရှိ</SelectItem>
                <SelectItem value="playful">ကစားပွမ်း</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Target Audience and Keywords */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetAudience">ပစ်မှတ် ပရိသတ်</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => updateFormData({ targetAudience: e.target.value })}
              placeholder="ဥပမာ - ရန်ကုန်မြို့ရှိ လူငယ် ပရော်ဖက်ရှင်နယ်များ"
            />
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
        </div>

        {/* Content Options */}
        <div className="space-y-4">
          <Label className="text-base font-medium">ကွန်တင့် အင်္ဂါရပ်များ</Label>
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
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ပရော်ဖက်ရှင်နယ် ကွန်တင့် ဖန်တီးနေသည်...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                မြန်မာ ကွန်တင့် ဖန်တီးပါ
              </>
            )}
          </Button>

          {hasContent && (
            <Button
              onClick={onGenerateImages}
              disabled={isGeneratingImages || !hasContent}
              variant="outline"
              className="w-full border-myanmar-red text-myanmar-red hover:bg-myanmar-red hover:text-white transition-colors text-lg py-6"
            >
              {isGeneratingImages ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ဂရပ်ဖစ်များ ဖန်တီးနေသည်...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  ကိုက်ညီသော ပုံများ ဖန်တီးပါ
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFormConfig;
