import Sidebar from "./Sidebar";

const AppLayout = ({
  children,
  onLogout,
  theme,
}) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: theme?.background,
        minHeight: "100vh",
      }}
    >
      <Sidebar onLogout={onLogout} />

      <div
        style={{
          flex: 1,
          padding: "24px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;