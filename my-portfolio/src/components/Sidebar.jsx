import { ChevronLeft, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "../data/data";
import "../styles/sidebar.css";

export default function Sidebar({ activeSection, sidebarOpen, setSidebarOpen, mobileOpen, setMobileOpen, scrollTo }) {
  const sidebarClass = [
    "sidebar",
    mobileOpen   ? "sidebar--mobile-open" : "",
    !sidebarOpen ? "sidebar--collapsed"   : "",
  ].join(" ");

  return (
    <>
      <aside className={sidebarClass}>
        <div className="sidebar__header">
          {sidebarOpen && <span className="sidebar__logo">Portfolio<span>.</span></span>}
          <button
            className="sidebar__toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_LINKS.map(({ label, id, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar__link ${activeSection === id ? "sidebar__link--active" : ""}`}
              onClick={() => { scrollTo(id); setMobileOpen(false); }}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon size={16} className="sidebar__icon" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <button
        className={`hamburger ${mobileOpen ? "hamburger--open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </>
  );
}