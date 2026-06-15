import { useState, useEffect } from "react";
import axiosInstance from "../services/axiosinstances";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(false);
        try {
            const response = await axiosInstance.get("/tasks");
            setTasks(response.data || []);
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.status?.toLowerCase() === "completed").length,
        pending: tasks.filter((t) => t.status?.toLowerCase() === "pending").length,
    };

    return (
        <main className="container dashboard-page">
            <section className="dashboard-hero auth-card">
                <div>
                    <h2>Welcome back</h2>
                    <p>Track progress, review completed work, and stay on top of your plan.</p>
                </div>
                <div className="hero-stats">
                    <div className="stat-card purple">
                        <strong>{stats.total}</strong>
                        <span>Total tasks</span>
                    </div>
                    <div className="stat-card blue">
                        <strong>{stats.completed}</strong>
                        <span>Completed</span>
                    </div>
                    <div className="stat-card green">
                        <strong>{stats.pending}</strong>
                        <span>Pending</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;