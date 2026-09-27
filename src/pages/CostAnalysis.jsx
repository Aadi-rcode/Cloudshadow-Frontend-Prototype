import { useEffect, useMemo, useState } from "react";
import { getCostData } from "../lib/api.js";
import CostChart from "../components/CostChart.jsx";
import StatCard from "../components/StatCard.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { StatGridSkeleton, ChartSkeleton, TableSkeleton } from "../components/LoadingState.jsx";
import { formatINR, formatINRFull, formatPercent } from "../utils/analysis.js";

const CATEGORY_ALL = "All categories";

export default function CostAnalysis({ period }) {
  const [state, setState] = useState({ status: "loading", data: null });
  const [category, setCategory] = useState(CATEGORY_ALL);
  const [service, setService] = useState("All services");

  function load() {
    setState({ status: "loading", data: null });
    getCostData(period)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, [period]);

  const categoryOptions = useMemo(() => {
    if (!state.data) return [CATEGORY_ALL];
    return [CATEGORY_ALL, ...state.data.categories.map((c) => c.category)];
  }, [state.data]);

  const visibleCategories = useMemo(() => {
    if (!state.data) return [];
    if (category === CATEGORY_ALL) return state.data.categories;
    return state.data.categories.filter((c) => c.category === category);
  }, [state.data, category]);

  if (state.status === "error") {
    return (
      <div>
        <div className="page-header">
          <h1>Cost Analysis</h1>
        </div>
        <ErrorState onRetry={load} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Cost Analysis</h1>
          <div className="subtitle">Break down spend by service, category and time.</div>
        </div>
      </div>

      <div className="table-toolbar">
        <select
          className="select-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="select-input"
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-label="Filter by service"
        >
          <option>All services</option>
          <option>EC2 — API Fleet</option>
          <option>RDS — Primary</option>
          <option>S3 — Object Storage</option>
          <option>Lambda — Event Workers</option>
        </select>
      </div>

      {state.status === "loading" && (
        <div className="stack">
          <StatGridSkeleton />
          <ChartSkeleton />
          <TableSkeleton />
        </div>
      )}

      {state.status === "ready" && (
        <>
          <div className="stat-grid">
            <StatCard
              label="Total Cost"
              value={formatINR(state.data.summary.currentTotal)}
              change={formatPercent(state.data.summary.percentIncrease)}
              tone="danger"
            />
            <StatCard
              label="Cost Growth"
              value={formatPercent(state.data.summary.percentIncrease)}
              change="vs. previous period"
              tone="warning"
            />
            <StatCard
              label="Daily Cost"
              value={formatINRFull(state.data.summary.dailyAverage)}
              change="Average per day"
              tone="neutral"
            />
            <StatCard
              label="Monthly Projection"
              value={formatINR(state.data.summary.monthlyProjection)}
              change="At current trend"
              tone="warning"
            />
          </div>

          <div className="card mt-16">
            <div className="section-title">Cost Trend vs. Previous Period</div>
            <CostChart data={state.data.trend} height={280} />
          </div>

          <div className="card mt-16">
            <div className="section-title">Category-wise Cost</div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCategories.map((c) => (
                    <tr key={c.category}>
                      <td>{c.category}</td>
                      <td>{formatINRFull(c.cost)}</td>
                      <td>
                        <span
                          className={`pill ${c.change > 25 ? "danger" : c.change > 10 ? "warning" : "positive"}`}
                        >
                          {formatPercent(c.change, { decimals: 0 })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
