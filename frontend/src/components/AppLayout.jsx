import Sidebar from "./Sidebar";

const AppLayout = ({ children, onLogout, theme, darkMode = false, toggleTheme }) => {
  const effectiveTheme = theme || {
    background: '#f5f7fb',
    card: '#ffffff',
    text: '#111827',
    border: '#e2e8f0',
    primary: '#2c77f4',
  };

  return (
    <div
      className="app-shell"
      style={{
        display: "flex",
        background: effectiveTheme.background,
        minHeight: "100vh",
        color: effectiveTheme.text,
      }}
    >
      <Sidebar onLogout={onLogout} theme={effectiveTheme} />

      <div className="app-main-panel">
        <header className="app-header" style={{ background: effectiveTheme.card }}>
          <div>
            <h1 style={{ color: effectiveTheme.text }}>Spin Tracker</h1>
            <p style={{ color: effectiveTheme.secondaryText || '#64748b' }}>
              Performance, progress, and planning in one place.
            </p>
          </div>

          {toggleTheme && (
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          )}
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;