import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("fellas_token");

  const handleLogout = () => {
    localStorage.removeItem("fellas_token");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/logo.png" alt="Fellas" className="logo" />
        <div style={{ fontWeight: 700 }}>Fellas Indonesia</div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Layanan Kami</Link>
        <Link to="/articles">Artikel</Link>
        {token ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login / Register
          </Link>
        )}
      </nav>
    </header>
  );
}
