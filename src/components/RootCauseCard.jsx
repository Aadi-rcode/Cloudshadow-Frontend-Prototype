import { useNavigate } from "react-router-dom";

export default function RootCauseCard({ rootCause }) {
  const navigate = useNavigate();
  if (!rootCause) return null;

  return (
    <div className="root-cause-card">
      <div className="root-cause-eyebrow">
        <span className="root-cause-dot" aria-hidden="true" />
        ROOT CAUSE DETECTED
      </div>
      <div className="root-cause-headline">{rootCause.headline}</div>

      <div className="impact-chain">
        {rootCause.impactSeries.map((v, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="impact-chip">{v > 0 ? "+" : ""}{v}%</span>
            {i < rootCause.impactSeries.length - 1 && (
              <span className="impact-arrow" aria-hidden="true">→</span>
            )}
          </span>
        ))}
      </div>

      <p className="root-cause-desc">{rootCause.description}</p>

      <div>
        <button className="btn btn-danger" onClick={() => navigate("/root-cause")}>
          View Analysis →
        </button>
      </div>
    </div>
  );
}
