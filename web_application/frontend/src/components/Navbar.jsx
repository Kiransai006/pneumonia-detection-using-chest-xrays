export default function Navbar({ activePage, setActivePage, onLogout }) {
  const links = [
    { id: "detect", label: "Detect" },
    { id: "performance", label: "Model Performance" },
    { id: "analysis", label: "Analysis" },
    { id: "about", label: "About" }
  ];

  return (
    <div className="navbar">
      <div className="brand">Pneumo<span>Detect</span></div>
      <div className="navLinks">
        {links.map((link) => (
          <button
            key={link.id}
            className={activePage === link.id ? "active" : ""}
            onClick={() => setActivePage(link.id)}>
            {link.label}
          </button>
        ))}
        <button className="logoutBtn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}