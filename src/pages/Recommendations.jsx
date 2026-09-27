import { useEffect, useState } from "react";
import { getRecommendationsData } from "../lib/api.js";
import RecommendationCard from "../components/RecommendationCard.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { StatGridSkeleton } from "../components/LoadingState.jsx";
import { formatINRFull } from "../utils/analysis.js";

export default function Recommendations() {
  const [state, setState] = useState({ status: "loading", data: null });
  const [applied, setApplied] = useState(new Set());

  function load() {
    setState({ status: "loading", data: null });
    getRecommendationsData()
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, []);

  function handleApply(id) {
    setApplied((prev) => new Set(prev).add(id));
  }

  const totalSavings =
    state.data?.reduce((sum, r) => sum + r.savings, 0) ?? 0;
  const appliedSavings =
    state.data
      ?.filter((r) => applied.has(r.id))
      .reduce((sum, r) => sum + r.savings, 0) ?? 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Recommendations</h1>
          <div className="subtitle">
            Optimization actions ranked by estimated monthly savings.
          </div>
        </div>
      </div>

      {state.status === "loading" && <StatGridSkeleton />}
      {state.status === "error" && <ErrorState onRetry={load} />}

      {state.status === "ready" && (
        <>
          <div className="stat-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className="card stat-card">
              <span className="stat-label">Total Potential Savings</span>
              <span className="stat-value">{formatINRFull(totalSavings)}/mo</span>
            </div>
            <div className="card stat-card">
              <span className="stat-label">Savings Applied</span>
              <span className="stat-value" style={{ color: "var(--positive)" }}>
                {formatINRFull(appliedSavings)}/mo
              </span>
            </div>
          </div>

          {state.data.length === 0 ? (
            <EmptyState
              title="No recommendations right now"
              description="CloudShadow hasn't found any optimization opportunities for this period."
            />
          ) : (
            <div className="rec-grid mt-16">
              {state.data.map((rec, i) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  index={i}
                  applied={applied.has(rec.id)}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
