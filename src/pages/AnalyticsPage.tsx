
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AudienceBehaviorDashboard from "@/components/AudienceBehaviorDashboard";
import ContentOptimizationPanel from "@/components/ContentOptimizationPanel";
import EngagementPredictor from "@/components/EngagementPredictor";
import PostingTimeOptimizer from "@/components/PostingTimeOptimizer";
import HashtagAnalyzer from "@/components/HashtagAnalyzer";

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      setLoading(true);
      const res = await fetch("/functions/v1/get-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();
      setAnalytics(data);
      setLoading(false);
    };
    fetchAnalytics();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }
  if (!analytics) {
    return <div className="text-center py-12">No analytics found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-2 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-6">📊 Myanmar Content Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AudienceBehaviorDashboard data={analytics.audience_behavior} />
        <ContentOptimizationPanel data={analytics.content_analytics} />
        <EngagementPredictor data={analytics.engagement_predictions} />
        <PostingTimeOptimizer data={analytics.posting_time} />
        <HashtagAnalyzer data={analytics.hashtag_performance} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
