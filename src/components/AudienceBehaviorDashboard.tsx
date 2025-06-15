
type AudienceBehavior = {
  id: string;
  platform: string;
  hour_of_day: number;
  day_of_week: number;
  interaction_type: string;
  count: number;
  recorded_at: string;
};

export default function AudienceBehaviorDashboard({ data }: { data: AudienceBehavior[] }) {
  return (
    <div className="p-6 rounded-2xl shadow glass-card flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-2">Audience Behavior (Myanmar)</h2>
      {data.length === 0 ? (
        <p className="text-gray-400">No data yet.</p>
      ) : (
        <ul className="max-h-52 overflow-y-auto text-sm leading-relaxed">
          {data.slice(0, 8).map(d => (
            <li key={d.id}>
              {d.platform} | {d.interaction_type} | Hour {d.hour_of_day} | Day {d.day_of_week} | <b>Count:</b> {d.count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
