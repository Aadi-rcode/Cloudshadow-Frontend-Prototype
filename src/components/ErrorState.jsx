export default function ErrorState({
  title = "Unable to load cloud cost data.",
  description = "Something went wrong while reaching CloudShadow's data service.",
  onRetry,
}) {
  return (
    <div className="state-panel card">
      <div className="state-icon" aria-hidden="true">
        ⚠
      </div>
      <div className="state-title">{title}</div>
      <div className="state-desc">{description}</div>
      {onRetry && (
        <button className="btn btn-ghost btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
