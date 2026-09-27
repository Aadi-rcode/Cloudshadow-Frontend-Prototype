export default function EmptyState({
  title = "Nothing here yet",
  description = "There's no data to show for this view right now.",
}) {
  return (
    <div className="state-panel card">
      <div className="state-icon" aria-hidden="true">
        ◌
      </div>
      <div className="state-title">{title}</div>
      <div className="state-desc">{description}</div>
    </div>
  );
}
