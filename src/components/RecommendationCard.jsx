import { formatINRFull } from "../utils/analysis.js";

export default function RecommendationCard({ rec, index, applied, onApply }) {
  const impactTone =
    rec.impact === "High" ? "danger" : rec.impact === "Medium" ? "warning" : "positive";

  return (
    <div className={`rec-card ${applied ? "applied" : ""}`}>
      <div className="flex-between">
        <span className="rec-index">{String(index + 1).padStart(2, "0")}</span>
        <span className={`pill ${impactTone}`}>{rec.impact} impact</span>
      </div>

      <div className="rec-title">{rec.title}</div>
      <p className="rec-desc">{rec.explanation}</p>

      <div>
        <div className="rec-savings-label">Estimated savings</div>
        <div className="rec-savings">{formatINRFull(rec.savings)}/mo</div>
      </div>

      <div className="rec-footer">
        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{rec.action}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onApply(rec.id)}
          disabled={applied}
        >
          {applied ? "Applied ✓" : "Apply"}
        </button>
      </div>
    </div>
  );
}
