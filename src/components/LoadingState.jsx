export function StatGridSkeleton() {
  return (
    <div className="stat-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton skeleton-card" />
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 300 }) {
  return <div className="skeleton" style={{ height, borderRadius: 12 }} />;
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton skeleton-row" />
      ))}
    </div>
  );
}

export default function LoadingState({ variant = "page" }) {
  if (variant === "table") return <TableSkeleton />;
  if (variant === "chart") return <ChartSkeleton />;
  return (
    <div className="stack">
      <StatGridSkeleton />
      <ChartSkeleton />
    </div>
  );
}
