import { statusTone } from "../utils/analysis.js";

export default function StatCard({ label, value, change, tone, status }) {
  const resolvedTone = tone ?? (status ? statusTone(status) : null);

  return (
    <div className="card stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {(change || status) && (
        <span className={`pill ${resolvedTone ?? "neutral"}`}>
          {status ?? change}
        </span>
      )}
    </div>
  );
}
