import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatINRFull, formatPercent, statusTone } from "../utils/analysis.js";
import EmptyState from "./EmptyState.jsx";

const STATUS_OPTIONS = ["All", "High", "Warning", "Normal"];

export default function ServiceTable({ services }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("cost");
  const [sortDir, setSortDir] = useState("desc");
  const navigate = useNavigate();

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    let rows = services.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    if (statusFilter !== "All") {
      rows = rows.filter((s) => s.status === statusFilter);
    }
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (typeof a[sortKey] === "string") {
        return a[sortKey].localeCompare(b[sortKey]) * dir;
      }
      return (a[sortKey] - b[sortKey]) * dir;
    });
    return rows;
  }, [services, query, statusFilter, sortKey, sortDir]);

  function sortIndicator(key) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? "↑" : "↓";
  }

  return (
    <div>
      <div className="table-toolbar">
        <input
          className="text-input"
          type="text"
          placeholder="Search services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search services"
        />
        <select
          className="select-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No services match"
          description="Try a different search term or clear the status filter."
        />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <span className="th-sort" onClick={() => toggleSort("name")}>
                    Service {sortIndicator("name")}
                  </span>
                </th>
                <th>
                  <span className="th-sort" onClick={() => toggleSort("cost")}>
                    Current Cost {sortIndicator("cost")}
                  </span>
                </th>
                <th>
                  <span className="th-sort" onClick={() => toggleSort("change")}>
                    Change {sortIndicator("change")}
                  </span>
                </th>
                <th>
                  <span className="th-sort" onClick={() => toggleSort("usage")}>
                    Usage {sortIndicator("usage")}
                  </span>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} onClick={() => navigate(`/dependencies?node=${s.id}`)}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.name}</div>
                    <div style={{ color: "var(--text-tertiary)", fontSize: 12 }}>
                      {s.type}
                    </div>
                  </td>
                  <td>{formatINRFull(s.cost)}</td>
                  <td>
                    <span className={`pill ${s.change > 25 ? "danger" : s.change > 10 ? "warning" : "positive"}`}>
                      {formatPercent(s.change, { decimals: 0 })}
                    </span>
                  </td>
                  <td>{s.usage}%</td>
                  <td>
                    <span className={`pill ${statusTone(s.status)}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
