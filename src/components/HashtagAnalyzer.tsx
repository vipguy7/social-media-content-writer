
type HashtagData = {
  id: string;
  hashtag: string;
  platform: string | null;
  usage_count: number | null;
  avg_engagement: number | null;
  best_performing: boolean | null;
};
export default function HashtagAnalyzer({ data }: { data: HashtagData[] }) {
  return (
    <div className="p-6 rounded-2xl shadow glass-card flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-2">Hashtag Analyzer</h2>
      <ul className="max-h-52 overflow-y-auto text-sm flex flex-col gap-1">
        {data && data.length ? (
          data.slice(0,9).map((h) => (
            <li key={h.id}>
              <span className={h.best_performing ? "font-bold text-green-600" : ""}>
                #{h.hashtag}
              </span> on {h.platform || "any"} | Used: {h.usage_count ?? 0} | AvgEng: {h.avg_engagement ?? "-"}
            </li>
          ))
        ) : (
          <li>No hashtag data yet.</li>
        )}
      </ul>
      <div className="mt-2 text-xs text-gray-500">Track and use top-performing hashtags in Myanmar.</div>
    </div>
  );
}
