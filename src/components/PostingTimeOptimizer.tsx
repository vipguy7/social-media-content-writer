
type PostTime = {
  id: string;
  platform: string | null;
  recommended_hour: number | null;
  recommended_day: number | null;
  confidence_score: number | null;
  last_updated: string;
};
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export default function PostingTimeOptimizer({ data }: { data: PostTime[] }) {
  if (!data.length) return (
    <div className="p-6 rounded-2xl shadow glass-card">
      <h2 className="text-xl font-bold mb-2">Best Time to Post</h2>
      <p className="text-gray-400">No optimization data available.</p>
    </div>
  );
  return (
    <div className="p-6 rounded-2xl shadow glass-card">
      <h2 className="text-xl font-bold mb-2">Best Time to Post</h2>
      <ul className="max-h-52 overflow-y-auto text-sm">
        {data.map((d) => (
          <li key={d.id}>
            {d.platform ?? "All"}: Day <b>{days[d.recommended_day ?? 0]}</b>, Hour <b>{d.recommended_hour ?? "--"}</b> (Score: <b>{Math.round(Number(d.confidence_score)*100)/100}</b>)
          </li>
        ))}
      </ul>
      <div className="mt-2 text-xs text-gray-500">Use best time slots to maximize audience reach.</div>
    </div>
  );
}
