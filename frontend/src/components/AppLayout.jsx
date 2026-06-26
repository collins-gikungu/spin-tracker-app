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
      style={{
        display: "flex",
        backgroundColor: effectiveTheme.background,
        minHeight: "100vh",
        color: effectiveTheme.text,
      }}
    >
      <Sidebar onLogout={onLogout} theme={effectiveTheme} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            background: effectiveTheme.card,
            borderBottom: `1px solid ${effectiveTheme.border}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            zIndex: 10,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', color: effectiveTheme.text }}>
              Spin Tracker
            </h1>
            <p style={{ margin: 0, color: effectiveTheme.secondaryText || '#64748b' }}>
              Performance, progress, and planning in one place.
            </p>
          </div>

          {toggleTheme && (
            <button
              onClick={toggleTheme}
              style={{
                padding: '10px 16px',
                border: '1px solid transparent',
                borderRadius: '999px',
                cursor: 'pointer',
                background: effectiveTheme.primary,
                color: '#fff',
                fontWeight: '700',
              }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          )}
        </header>

        <main style={{ flex: 1, padding: '24px' }}>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;