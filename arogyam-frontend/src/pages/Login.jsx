import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        username: username.trim(),
        password: password.trim()
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "administrator") navigate("/admin");
      else if (res.data.role === "doctor") navigate("/doctor");
      else if (res.data.role === "patient") navigate("/patient/history");
      else navigate("/recept");
    } catch {
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Hospital Login</h3>

        <form onSubmit={login}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-100"
            disabled={loading || !username || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
