import { useState, useEffect } from "react";
import { formatINRFull, formatPercent, statusTone } from "../utils/analysis.js";

const VIEW_W = 560;
const VIEW_H = 420;
const NODE_W = 128;
const NODE_H = 46;

const TYPE_COLOR = {
  Network: "#7c93ff",
  Compute: "#34d6c0",
  Database: "#f0a640",
  Storage: "#8992a8",
};

export default function DependencyGraph({ graph, initialSelected }) {
  const [selectedId, setSelectedId] = useState(initialSelected ?? null);

  useEffect(() => {
    if (initialSelected) setSelectedId(initialSelected);
  }, [initialSelected]);

  const { nodes, edges } = graph;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const selected = selectedId ? byId[selectedId] : null;

  function pos(node) {
    return {
      x: node.x * VIEW_W,
      y: node.y * VIEW_H,
    };
  }

  return (
    <div className="graph-wrap">
      <div className="graph-canvas">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          width="100%"
          height="100%"
          role="img"
          aria-label="Service dependency graph"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#3a4260" />
            </marker>
          </defs>

          {edges.map((e, i) => {
            const from = pos(byId[e.from]);
            const to = pos(byId[e.to]);
            const midY = (from.y + to.y) / 2;
            const path = `M${from.x},${from.y + NODE_H / 2} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y - NODE_H / 2}`;
            return (
              <path
                key={i}
                d={path}
                stroke="#3a4260"
                strokeWidth="1.6"
                fill="none"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {nodes.map((n) => {
            const p = pos(n);
            const isSelected = n.id === selectedId;
            const color = TYPE_COLOR[n.type] ?? "#7c93ff";
            return (
              <g
                key={n.id}
                className={`graph-node ${isSelected ? "selected" : ""}`}
                transform={`translate(${p.x - NODE_W / 2}, ${p.y - NODE_H / 2})`}
                onClick={() => setSelectedId(n.id)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${n.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedId(n.id);
                }}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill="#1a2032"
                  stroke={isSelected ? "#7c93ff" : "#232a3d"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <circle cx="16" cy={NODE_H / 2} r="4" fill={color} />
                <text
                  x="30"
                  y={NODE_H / 2 - 3}
                  fill="#e7eaf2"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {n.name}
                </text>
                <text
                  x="30"
                  y={NODE_H / 2 + 13}
                  fill="#8992a8"
                  fontSize="10.5"
                  fontFamily="Inter, sans-serif"
                >
                  {n.type} · {formatPercent(n.change, { decimals: 0 })}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="card" style={{ minHeight: 260 }}>
        {selected ? (
          <div>
            <div className="section-title" style={{ marginBottom: 4 }}>
              {selected.name}
            </div>
            <span className={`pill ${statusTone(selected.risk)}`} style={{ marginBottom: 10 }}>
              {selected.risk} risk
            </span>

            <div className="node-detail-row">
              <span className="node-detail-label">Type</span>
              <span>{selected.type}</span>
            </div>
            <div className="node-detail-row">
              <span className="node-detail-label">Current Cost</span>
              <span>{formatINRFull(selected.cost)}</span>
            </div>
            <div className="node-detail-row">
              <span className="node-detail-label">Change</span>
              <span>{formatPercent(selected.change, { decimals: 0 })}</span>
            </div>
            <div className="node-detail-row">
              <span className="node-detail-label">Usage</span>
              <span>{selected.usage}%</span>
            </div>
            <div className="node-detail-row">
              <span className="node-detail-label">Dependencies</span>
              <span className="node-detail-tags">
                {selected.dependencies.length ? (
                  selected.dependencies.map((d) => (
                    <span key={d} className="tag">
                      {d}
                    </span>
                  ))
                ) : (
                  <span className="tag">None</span>
                )}
              </span>
            </div>
            <div className="node-detail-row">
              <span className="node-detail-label">Dependents</span>
              <span className="node-detail-tags">
                {selected.dependents.length ? (
                  selected.dependents.map((d) => (
                    <span key={d} className="tag">
                      {d}
                    </span>
                  ))
                ) : (
                  <span className="tag">None</span>
                )}
              </span>
            </div>
          </div>
        ) : (
          <div className="node-detail-empty">
            Click a node in the graph to see its dependencies, dependents and cost.
          </div>
        )}
      </div>
    </div>
  );
}
