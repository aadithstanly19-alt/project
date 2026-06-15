import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../services/axiosinstances";
import toast from "react-hot-toast";

function Profile() {
    const { user, setUser, logout } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("need a name");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put("/auth/me", { name });
            setUser(response.data);
            toast.success("name updated!");
        } catch (err) {
            toast.error(err?.response?.data?.message || "error updating profile");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.success("logged out");
        navigate("/login", { replace: true });
    };

    if (!user) {
        return (
            <div className="container">
                <p>Loading user profile...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="auth-page">
                <div className="auth-card">
                    <h2>User Profile</h2>
                    
                    <p style={{ marginBottom: 16 }}>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name-input">Name</label>
                            <input
                                id="name-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn"
                                type="submit"
                                disabled={loading}
                                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                            >
                                {loading && <span className="btn-spinner"></span>}
                                {loading ? "Updating..." : "Update Name"}
                            </button>
                        </div>
                    </form>

                    <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid var(--border)" }} />

                    <div className="form-group">
                        <button
                            className="btn"
                            onClick={handleLogout}
                            style={{ backgroundColor: "#000000", color: "white" }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
