
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Wand2 } from 'lucide-react';
import { ContentFormData } from '@/pages/Index';

interface ContentFormConfigProps {
  formData: ContentFormData;
  setFormData: (data: ContentFormData) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ContentFormConfig = ({ formData, setFormData, onGenerate, isLoading }: ContentFormConfigProps) => {
  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-myanmar-red" />
          Content Configuration
        </CardTitle>
        <CardDescription>
          Define your content parameters to generate professional Burmese social media posts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Platform and Content Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={formData.platform} onValueChange={(value) => updateFormData({ platform: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
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
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={formData.contentType} onValueChange={(value) => updateFormData({ contentType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promotional">Promotional</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="entertaining">Entertaining</SelectItem>
                <SelectItem value="news">News & Updates</SelectItem>
                <SelectItem value="community">Community Building</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product/Service Name *</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              placeholder="Enter your product or service name"
              className="focus:ring-myanmar-red focus:border-myanmar-red"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyMessage">Key Message *</Label>
            <Textarea
              id="keyMessage"
              value={formData.keyMessage}
              onChange={(e) => updateFormData({ keyMessage: e.target.value })}
              placeholder="What's the main message you want to convey?"
              rows={3}
              className="focus:ring-myanmar-red focus:border-myanmar-red"
            />
          </div>
        </div>

        {/* Style and Objectives */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="objective">Marketing Objective</Label>
            <Select value={formData.objective} onValueChange={(value) => updateFormData({ objective: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
                <SelectItem value="retention">Customer Retention</SelectItem>
                <SelectItem value="traffic">Website Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Writing Style</Label>
            <Select value={formData.style} onValueChange={(value) => updateFormData({ style: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Target Audience and Keywords */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => updateFormData({ targetAudience: e.target.value })}
              placeholder="e.g., Young professionals in Yangon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => updateFormData({ keywords: e.target.value })}
              placeholder="e.g., မြန်မာ, အရည်အသွေး, ဝန်ဆောင်မှု"
            />
          </div>
        </div>

        {/* Content Options */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Content Features</Label>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="includeCTA" className="text-sm">Call to Action</Label>
              <Switch
                id="includeCTA"
                checked={formData.includeCTA}
                onCheckedChange={(checked) => updateFormData({ includeCTA: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="includeEmojis" className="text-sm">Emojis</Label>
              <Switch
                id="includeEmojis"
                checked={formData.includeEmojis}
                onCheckedChange={(checked) => updateFormData({ includeEmojis: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="includeHashtags" className="text-sm">Hashtags</Label>
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
            Number of Variations
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

        {/* Generate Button */}
        <Button
          onClick={onGenerate}
          disabled={isLoading || !formData.productName.trim() || !formData.keyMessage.trim()}
          className="w-full myanmar-gradient hover:opacity-90 transition-opacity text-lg py-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Myanmar Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentFormConfig;
