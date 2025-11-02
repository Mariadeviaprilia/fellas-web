import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        const res = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error("Register failed");
        alert("Register berhasil, silakan login");
        setMode("login");
        return;
      }
      // login
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed");
      localStorage.setItem("fellas_token", json.token);
      alert("Login berhasil");
      navigate("/");
    } catch (err: any) {
      alert(err.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h3>{mode === "login" ? "Login" : "Register"}</h3>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
        )}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button type="submit" className="btn" style={{ width: "100%" }}>
          {mode === "login" ? "Masuk" : "Daftar"}
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        {mode === "login" ? (
          <>
            <span>Belum punya akun? </span>
            <button
              onClick={() => setMode("register")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--pink)",
                cursor: "pointer",
              }}
            >
              Daftar
            </button>
          </>
        ) : (
          <>
            <span>Sudah punya akun? </span>
            <button
              onClick={() => setMode("login")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--pink)",
                cursor: "pointer",
              }}
            >
              Masuk
            </button>
          </>
        )}
      </div>
    </div>
  );
}
