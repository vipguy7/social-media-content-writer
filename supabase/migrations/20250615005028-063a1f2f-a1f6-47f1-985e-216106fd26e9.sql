
-- 1. Table for storing content analytics (views, likes, shares, comments, engagement, timestamp, etc.)
CREATE TABLE public.content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid NOT NULL,
  user_id uuid NOT NULL,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  comments integer DEFAULT 0,
  engagement_score numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  platform text,
  hashtags text[],
  posted_at timestamptz,
  CONSTRAINT fk_content FOREIGN KEY(content_id) REFERENCES generated_content(id)
);

-- 2. Table for audience (Myanmar market) social media behavioral patterns
CREATE TABLE public.audience_behavior (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform text NOT NULL,
  hour_of_day integer NOT NULL, -- 0-23 (posting/view times)
  day_of_week integer NOT NULL, -- 0=Sunday ... 6=Saturday
  interaction_type text NOT NULL, -- view, like, share, comment
  count integer DEFAULT 0,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Table for hashtag performance tracking
CREATE TABLE public.hashtag_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hashtag text NOT NULL,
  platform text,
  usage_count integer DEFAULT 0,
  avg_engagement numeric,
  best_performing boolean DEFAULT false,
  last_used timestamptz
);

-- 4. Table for storing system's AI engagement predictions
CREATE TABLE public.engagement_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid NOT NULL,
  user_id uuid NOT NULL,
  predicted_score numeric,
  actual_score numeric,
  predicted_post_time timestamptz,
  prediction_model_version text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_content FOREIGN KEY(content_id) REFERENCES generated_content(id)
);

-- 5. Table for storing best posting times
CREATE TABLE public.posting_time_optimization (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform text,
  recommended_hour integer, -- best hour 0-23
  recommended_day integer,  -- best day 0-6
  confidence_score numeric,
  last_updated timestamptz NOT NULL DEFAULT now()
);

-- Row Level Security for all analytics tables
ALTER TABLE public.content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience_behavior ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hashtag_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posting_time_optimization ENABLE ROW LEVEL SECURITY;

-- RLS policies (user can only see their own analytics, except hashtags which is mostly public)
CREATE POLICY "User can manage own content_analytics" ON public.content_analytics
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can manage own audience_behavior" ON public.audience_behavior
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can manage their own engagement_predictions" ON public.engagement_predictions
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can manage their own posting_time_optimization" ON public.posting_time_optimization
  FOR ALL USING (user_id = auth.uid());

-- Hashtag performance can be selected by anyone, but only updated by admin (extend as needed)
CREATE POLICY "Anyone can read hashtag_performance" ON public.hashtag_performance
  FOR SELECT USING (true);

-- Indexes for query performance
CREATE INDEX idx_content_analytics_content_id ON public.content_analytics(content_id);
CREATE INDEX idx_audience_behavior_hour ON public.audience_behavior(hour_of_day);
CREATE INDEX idx_hashtag_performance_hashtag ON public.hashtag_performance(hashtag);

