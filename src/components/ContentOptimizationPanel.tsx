
type ContentAnalytics = {
  id: string;
  content_id: string;
  views: number | null;
  likes: number | null;
  shares: number | null;
  comments: number | null;
  engagement_score: number | null;
  created_at: string;
};
export default function ContentOptimizationPanel({ data }: { data: ContentAnalytics[] }) {
  const avgEngagement = data.length
    ? Math.round(
        (data.reduce((sum, d) => sum + (Number(d.engagement_score) || 0), 0) /
          data.length) *
          100
      ) / 100
    : 0;
  return (
    <div className="p-6 rounded-2xl shadow glass-card flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-2">Content Optimization</h2>
      <div className="mb-2">Avg Engagement Score: <b>{avgEngagement}</b></div>
      <ul className="max-h-52 overflow-y-auto text-sm">
        {data.slice(0,8).map((d) => (
          <li key={d.id}>
            {d.created_at?.slice(0,10)}: <b>{d.engagement_score ?? "-"}</b> pts | {d.views} views
          </li>
        ))}
      </ul>
      <div className="mt-2 text-xs text-gray-500">Improve weak posts for better results.</div>
    </div>
  );
}
