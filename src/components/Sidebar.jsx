import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Overview" },
  { to: "/cost", label: "Cost" },
  { to: "/services", label: "Services" },
  { to: "/root-cause", label: "Root Cause" },
  { to: "/dependencies", label: "Dependencies" },
  { to: "/recommendations", label: "Recommendations" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <div>
            <div className="brand-name">CloudShadow</div>
            <div className="brand-tag">Cloud Cost Intelligence</div>
          </div>
        </div>

        <nav aria-label="Primary">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav-dot" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">CloudShadow Intelligence · v0.1</div>
      </aside>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 30,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
