
type EngagementPrediction = {
  id: string;
  predicted_score: number | null;
  actual_score: number | null;
  predicted_post_time?: string;
  created_at: string;
};
export default function EngagementPredictor({ data }: { data: EngagementPrediction[] }) {
  return (
    <div className="p-6 rounded-2xl shadow glass-card flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-2">Engagement Predictor</h2>
      <ul className="max-h-52 overflow-y-auto text-sm">
        {data.length ? (
          data
            .slice(0, 8)
            .map((d) => (
              <li key={d.id}>
                {d.created_at?.slice(0,10)} | Pred: <b>{d.predicted_score ?? "–"}</b> | Actual: <b>{d.actual_score ?? "–"}</b>
              </li>
            ))
        ) : (
          <li>No prediction data yet.</li>
        )}
      </ul>
      <div className="mt-2 text-xs text-gray-500">Predict and compare engagement for each post.</div>
    </div>
  );
}
