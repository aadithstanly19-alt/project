import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosinstances";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("fill all fields");
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      toast.error("bad email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", form);
      navigate("/login", {
        replace: true,
        state: { message: "registered! please login" }
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="auth-card">
          <h2>Create account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
            </div>

            <div className="form-group">
              <button
                className="btn"
                disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                {loading && <span className="btn-spinner"></span>}
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;