import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import axiosInstance from "../services/axiosinstances";
import toast from "react-hot-toast";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axiosInstance.get("/tasks");
            setTasks(response.data || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (newTaskData) => {
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post("/tasks", newTaskData);
            setTasks([...tasks, response.data]);
            setIsModalOpen(false);
            setTaskToEdit(null);
            toast.success("task added!");
        } catch (err) {
            toast.error(err?.response?.data?.message || "error adding task");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTask = async (updatedTaskData) => {
        if (!taskToEdit) return;
        setIsSubmitting(true);
        try {
            const id = taskToEdit.id || taskToEdit._id;
            const response = await axiosInstance.put(`/tasks/${id}`, updatedTaskData);
            setTasks(tasks.map((task) => (task.id === id || task._id === id ? response.data : task)));
            setIsModalOpen(false);
            setTaskToEdit(null);
            toast.success("task updated!");
        } catch (err) {
            toast.error(err?.response?.data?.message || "error updating task");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTask = async (task) => {
        const id = task.id || task._id;
        if (!window.confirm("Delete this task?")) return;
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            setTasks(tasks.filter((item) => item.id !== id && item._id !== id));
            toast.success("task deleted!");
        } catch (err) {
            toast.error(err?.response?.data?.message || "error deleting task");
        }
    };

    const handleToggleComplete = async (task) => {
        const id = task.id || task._id;
        const newStatus = task.status?.toLowerCase() === "completed" ? "pending" : "completed";
        try {
            const response = await axiosInstance.patch(`/tasks/${id}`, { status: newStatus });
            setTasks(tasks.map((t) => (t.id === id || t._id === id ? response.data : t)));
            toast.success(newStatus === "completed" ? "task done!" : "task pending!");
        } catch (err) {
            toast.error(err?.response?.data?.message || "error changing status");
        }
    };

    const taskStats = {
        urgent: tasks.filter((t) => t.priority === "high" || t.priority === "urgent").length,
        inReview: tasks.filter((t) => t.status?.toLowerCase() === "needs review").length,
        backlog: tasks.filter((t) => t.status?.toLowerCase() === "pending").length,
    };

    const counts = {
        all: tasks.length,
        pending: tasks.filter((t) => t.status?.toLowerCase() === "pending").length,
        completed: tasks.filter((t) => t.status?.toLowerCase() === "completed").length,
        high: tasks.filter((t) => t.priority?.toLowerCase() === "high" || t.priority?.toLowerCase() === "urgent").length,
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = (task.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        let matchesTab = true;
        if (activeTab === "pending") {
            matchesTab = task.status?.toLowerCase() === "pending";
        } else if (activeTab === "completed") {
            matchesTab = task.status?.toLowerCase() === "completed";
        } else if (activeTab === "high") {
            matchesTab = task.priority?.toLowerCase() === "high" || task.priority?.toLowerCase() === "urgent";
        }
        return matchesSearch && matchesTab;
    });

    return (
        <main className="container tasks-page">
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setTaskToEdit(null);
                }}
                onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}
                isLoading={isSubmitting}
                initialData={taskToEdit}
                title={taskToEdit ? "Edit task" : "Create new task"}
                submitLabel={taskToEdit ? "Update task" : "Create task"}
            />

            <aside className="task-sidebar auth-card">
                <h2>Task summary</h2>
                <p>Quick overview of your task priorities.</p>
                <ul className="task-summary-list">
                    <li>Urgent: {taskStats.urgent}</li>
                    <li>In review: {taskStats.inReview}</li>
                    <li>Backlog: {taskStats.backlog}</li>
                </ul>
            </aside>

            <section className="task-board">
                <div className="task-header auth-card">
                    <h2>Task board</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            setTaskToEdit(null);
                            setIsModalOpen(true);
                        }}
                    >
                        New task
                    </button>
                </div>

                <div className="auth-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Search tasks by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid var(--border)",
                                outline: "none",
                                fontSize: "14px",
                                backgroundColor: "var(--bg)",
                                color: "var(--text-h)"
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                            type="button"
                            onClick={() => setActiveTab("all")}
                            style={{
                                border: "1px solid var(--border)",
                                padding: "6px 12px",
                                background: activeTab === "all" ? "var(--accent)" : "transparent",
                                color: activeTab === "all" ? "var(--bg)" : "var(--text)",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                        >
                            All ({counts.all})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("pending")}
                            style={{
                                border: "1px solid var(--border)",
                                padding: "6px 12px",
                                background: activeTab === "pending" ? "var(--accent)" : "transparent",
                                color: activeTab === "pending" ? "var(--bg)" : "var(--text)",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                        >
                            Pending ({counts.pending})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("completed")}
                            style={{
                                border: "1px solid var(--border)",
                                padding: "6px 12px",
                                background: activeTab === "completed" ? "var(--accent)" : "transparent",
                                color: activeTab === "completed" ? "var(--bg)" : "var(--text)",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                        >
                            Completed ({counts.completed})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("high")}
                            style={{
                                border: "1px solid var(--border)",
                                padding: "6px 12px",
                                background: activeTab === "high" ? "var(--accent)" : "transparent",
                                color: activeTab === "high" ? "var(--bg)" : "var(--text)",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                        >
                            High Priority ({counts.high})
                        </button>
                    </div>
                </div>

                <div className="task-list auth-card">
                    {loading && (
                        <div style={{ padding: "40px", textAlign: "center" }}>
                            <div className="spinner" style={{ display: "inline-block" }}></div>
                            <p>Loading tasks...</p>
                        </div>
                    )}
                    {error && <div style={{ color: "#000000", padding: "16px" }}>{error}</div>}
                    {!loading && tasks.length === 0 && !error && (
                        <div style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                            <p>No tasks yet</p>
                            <p style={{ fontSize: "14px" }}>Create your first task to get started.</p>
                        </div>
                    )}
                    {!loading && tasks.length > 0 && filteredTasks.length === 0 && !error && (
                        <div style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                            <p>No tasks match your search or filter criteria.</p>
                        </div>
                    )}
                    {!loading && filteredTasks.length > 0 && (
                        <>
                            {filteredTasks.map((task) => (
                                <TaskCard
                                    key={task.id || task._id}
                                    task={task}
                                    onEdit={(task) => {
                                        setTaskToEdit(task);
                                        setIsModalOpen(true);
                                    }}
                                    onDelete={handleDeleteTask}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ))}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Tasks;
