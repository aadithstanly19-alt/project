import { useState, useEffect } from "react";

const initialForm = {
  title: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

function AddTaskModal({ isOpen, onClose, onSubmit, isLoading, initialData, title = "Create new task", submitLabel = "Save task" }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ? {
        title: initialData.title || "",
        status: initialData.status || "pending",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : "",
      } : initialForm);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    await onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#999",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: "normal", color: "#000000" }}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#000000" }}>
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={{
                  padding: "6px 8px",
                  border: "1px solid #cccccc",
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: "normal", color: "#000000" }}>
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                style={{
                  padding: "6px 8px",
                  border: "1px solid #cccccc",
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#000000" }}>
              Due date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {isLoading && <span className="btn-spinner"></span>}
              {isLoading ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: 20,
    maxWidth: 450,
    width: "90%",
    border: "1px solid #cccccc",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  form: {
    display: "grid",
    gap: 12,
  },
};

export default AddTaskModal;
