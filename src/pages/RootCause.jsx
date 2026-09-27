import { useEffect, useState } from "react";
import { getRootCauseData } from "../lib/api.js";
import ErrorState from "../components/ErrorState.jsx";
import { ChartSkeleton } from "../components/LoadingState.jsx";
import { formatINRFull, statusTone } from "../utils/analysis.js";

export default function RootCause() {
  const [state, setState] = useState({ status: "loading", data: null });

  function load() {
    setState({ status: "loading", data: null });
    getRootCauseData()
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, []);

  if (state.status === "loading") {
    return (
      <div>
        <div className="page-header">
          <h1>Root Cause Analysis</h1>
        </div>
        <ChartSkeleton height={420} />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div>
        <div className="page-header">
          <h1>Root Cause Analysis</h1>
        </div>
        <ErrorState onRetry={load} />
      </div>
    );
  }

  const d = state.data;
  const detectedDate = new Date(d.detectedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Root Cause Analysis</h1>
          <div className="subtitle">{d.problem}</div>
        </div>
        <span className={`pill ${statusTone(d.severity)}`}>{d.severity} severity</span>
      </div>

      <div className="detail-grid">
        <div className="card stat-card">
          <span className="stat-label">Severity</span>
          <span className="stat-value" style={{ fontSize: 19 }}>{d.severity}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Confidence</span>
          <span className="stat-value" style={{ fontSize: 19 }}>{d.confidence}%</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Estimated Impact</span>
          <span className="stat-value" style={{ fontSize: 19 }}>{formatINRFull(d.estimatedImpact)}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Detected</span>
          <span className="stat-value" style={{ fontSize: 15 }}>{detectedDate}</span>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-title">Cause → Effect Flow</div>
          <div className="flow">
            <div className="flow-step">
              <div className="flow-label">PROBLEM</div>
              <div className="flow-value">{d.problem}</div>
            </div>
            <div className="flow-connector">↓</div>
            <div className="flow-step">
              <div className="flow-label">AFFECTED SERVICE</div>
              <div className="flow-value">{d.affectedService}</div>
            </div>
            <div className="flow-connector">↓</div>
            <div className="flow-step">
              <div className="flow-label">DEPENDENCY</div>
              <div className="flow-value">{d.dependentService}</div>
            </div>
            <div className="flow-connector">↓</div>
            <div className="flow-step">
              <div className="flow-label">OBSERVED BEHAVIOUR</div>
              <div className="flow-value" style={{ fontWeight: 500, fontSize: 13 }}>
                {d.observedBehaviour}
              </div>
            </div>
            <div className="flow-connector">↓</div>
            <div className="flow-step" style={{ borderColor: "rgba(242,85,95,0.35)" }}>
              <div className="flow-label">COST IMPACT</div>
              <div className="flow-value" style={{ color: "var(--danger)" }}>
                Network cost increased significantly
              </div>
            </div>
            <div className="flow-connector">↓</div>
            <div className="flow-step" style={{ borderColor: "rgba(63,214,138,0.35)" }}>
              <div className="flow-label">RECOMMENDED ACTION</div>
              <div className="flow-value" style={{ color: "var(--positive)", fontSize: 13, fontWeight: 500 }}>
                {d.suggestedAction}
              </div>
            </div>
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <div className="section-title">Explanation</div>
            <p style={{ color: "var(--text-secondary)", fontSize: 13.5, lineHeight: 1.6 }}>
              {d.explanation}
            </p>
          </div>
          <div className="card">
            <div className="section-title">Cost Impact by Stage</div>
            {d.impactSeries.map((s) => (
              <div className="driver-row" key={s.stage}>
                <span className="driver-name">{s.stage}</span>
                <span className={`pill ${s.value > 40 ? "danger" : s.value > 0 ? "warning" : "neutral"}`}>
                  {s.value > 0 ? `+${s.value}%` : "Baseline"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
