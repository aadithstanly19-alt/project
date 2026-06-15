import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../services/axiosinstances";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle flash message from redirect
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear state so it doesn't pop up again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      toast.error("need email and password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      login(response.data.token);
      toast.success("logged in!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="auth-card">
          <h2>Sign in</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form-group">
              <button
                className="btn"
                disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                {loading && <span className="btn-spinner"></span>}
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;