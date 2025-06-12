
export interface ContentFormData {
  platform: string;
  contentType: string;
  contentLength: string;
  objective: string;
  style: string;
  productName: string;
  keyMessage: string;
  targetAudience: string;
  keywords: string;
  facebookPageLink: string;
  brandGender?: string;
  includeCTA: boolean;
  includeEmojis: boolean;
  includeHashtags: boolean;
  numVariations: number;
}

export interface QAMetrics {
  grammar: number;
  narrativeFlow: number;
  culturalContext: number;
  optimization: number;
  engagement: number;
}

export interface MarketingInsights {
  audienceProfile: string;
  emotionalTriggers: string[];
  brandPersonality: string;
  competitiveAdvantage: string;
  contentStrategy: string;
}
