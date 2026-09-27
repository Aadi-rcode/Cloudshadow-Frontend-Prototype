import { useEffect, useState } from "react";
import { getDashboardData } from "../lib/api.js";
import StatCard from "../components/StatCard.jsx";
import CostChart from "../components/CostChart.jsx";
import RootCauseCard from "../components/RootCauseCard.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { StatGridSkeleton, ChartSkeleton } from "../components/LoadingState.jsx";
import {
  formatINRFull,
  formatPercent,
  formatINR,
} from "../utils/analysis.js";

const PERIOD_LABEL = { "7d": "Last 7 Days", "30d": "Last 30 Days", "90d": "Last 90 Days" };

export default function Dashboard({ period }) {
  const [state, setState] = useState({ status: "loading", data: null });

  function load() {
    setState({ status: "loading", data: null });
    getDashboardData(period)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, [period]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Overview</h1>
          <div className="subtitle">
            Cloud spend intelligence across every connected service · {PERIOD_LABEL[period]}
          </div>
        </div>
      </div>

      {state.status === "error" && (
        <ErrorState onRetry={load} />
      )}

      {state.status === "loading" && (
        <div className="stack">
          <StatGridSkeleton />
          <ChartSkeleton />
        </div>
      )}

      {state.status === "ready" && (
        <>
          <div className="stat-grid">
            <StatCard
              label="Current Spend"
              value={formatINR(state.data.summary.currentTotal)}
              change={formatPercent(state.data.summary.percentIncrease)}
              tone="danger"
            />
            <StatCard
              label="Cost Increase"
              value={formatPercent(state.data.summary.percentIncrease)}
              change="vs. previous period"
              tone="warning"
            />
            <StatCard
              label="Performance"
              value={`${state.data.summary.performanceScore}/100`}
              change="Stable"
              tone="positive"
            />
            <StatCard
              label="Reliability"
              value={`${state.data.summary.reliabilityScore}/100`}
              change="Stable"
              tone="positive"
            />
          </div>

          <div className="two-col mt-16">
            <div className="card">
              <div className="section-title">
                Cloud Cost Trend
                <span className="muted">{formatINRFull(state.data.summary.currentTotal)} total</span>
              </div>
              <CostChart data={state.data.trend} />
            </div>

            <div className="card">
              <div className="section-title">Cost Drivers</div>
              {state.data.drivers.map((d) => (
                <div className="driver-row" key={d.id}>
                  <div>
                    <div className="driver-name">{d.name}</div>
                    <div className="driver-bar-track">
                      <div
                        className="driver-bar-fill"
                        style={{ width: `${d.percent * 2.2}%` }}
                      />
                    </div>
                  </div>
                  <div className="driver-right">
                    <div className="driver-cost">{formatINR(d.cost)}</div>
                    <span
                      className={`pill ${d.change > 25 ? "danger" : d.change > 10 ? "warning" : "positive"}`}
                    >
                      {formatPercent(d.change, { decimals: 0 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <RootCauseCard rootCause={state.data.rootCause} />
          </div>
        </>
      )}
    </div>
  );
}
