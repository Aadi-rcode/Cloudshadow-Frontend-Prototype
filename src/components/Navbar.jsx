const PERIODS = [
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
];

export default function Navbar({ title, period, onPeriodChange, onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="icon-btn mobile-nav-toggle"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <span className="navbar-crumb">CloudShadow /</span>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input type="text" placeholder="Search services, costs…" aria-label="Search" />
        </div>

        <div className="period-select" role="group" aria-label="Time period">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              className={`period-option ${period === p.id ? "active" : ""}`}
              onClick={() => onPeriodChange(p.id)}
              aria-pressed={period === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button className="icon-btn" aria-label="Notifications">
          🔔
        </button>
        <div className="avatar" title="Aaditya">
          A
        </div>
      </div>
    </header>
  );
}
