import { CalendarDays, ClipboardCheck, GraduationCap, LayoutDashboard, LogOut, Megaphone, UsersRound, WalletCards } from "lucide-react";

const tabIcons = {
  announcements: Megaphone,
  leaves: WalletCards,
  attendance: CalendarDays,
  profile: LayoutDashboard,
  employees: UsersRound,
  training: GraduationCap,
  leave: ClipboardCheck,
};

const DashboardLayout = ({
  role,
  title,
  tabs,
  activeTab,
  onTabChange,
  onLogout,
  children,
}) => {
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label;

  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <a className="workspace-brand" href="/" aria-label="StaffSync home">
          <span className="brand-mark">S</span>
          <span>
            <strong>StaffSync</strong>
            <small>People, in sync.</small>
          </span>
        </a>

        <div className="sidebar-caption">WORKSPACE</div>
        <nav className="workspace-nav" aria-label={`${role} workspace`}>
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.id] || LayoutDashboard;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`workspace-nav-item${activeTab === tab.id ? " is-active" : ""}`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-icon">✳</span>
          <p>A little progress each day adds up to big results.</p>
        </div>

        <button type="button" onClick={onLogout} className="workspace-logout">
          <LogOut aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>Sign out</span>
        </button>
      </aside>

      <main className="workspace-main">
        <header className="workspace-topbar">
          <div className="topbar-context">
            <span className="status-dot" />
            <span>{role} workspace</span>
          </div>
          <div className="topbar-user">
            <span className="topbar-avatar">{role.slice(0, 1)}</span>
            <span>{role}</span>
            <button type="button" onClick={onLogout} className="workspace-mobile-logout">
              <LogOut aria-hidden="true" size={17} strokeWidth={1.8} />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        <section className="workspace-content">
          <div className="workspace-heading">
            <div>
              <p className="eyebrow">YOUR PEOPLE HUB</p>
              <h1>{title}</h1>
              <p className="workspace-subtitle">
                A thoughtful space to keep your workday moving.
              </p>
            </div>
            {activeLabel && <span className="section-pill">{activeLabel}</span>}
          </div>

          <div className="workspace-panel">{children}</div>
          <footer className="workspace-footer">
            <span>Made for better workdays.</span>
            <span>StaffSync · {new Date().getFullYear()}</span>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
