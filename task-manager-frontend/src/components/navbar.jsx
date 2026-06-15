import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="topbar">
            <div className="brand">Task Manager</div>

            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                {!isAuthenticated && (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <Link to="/profile">Profile</Link>
                        {user && user.name && (
                            <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "var(--accent)",
                                color: "var(--bg)",
                                fontWeight: "bold",
                                fontSize: "14px",
                                marginLeft: "12px",
                                verticalAlign: "middle"
                            }} title={user.name}>
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <button onClick={handleLogout} style={{ marginLeft: 12 }}>
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;