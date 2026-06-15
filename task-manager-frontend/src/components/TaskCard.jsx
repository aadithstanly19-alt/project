function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const getStatusColor = (status) => {
    const colors = {
      completed: "#000000",
      pending: "#666666",
    };
    return colors[status?.toLowerCase()] || "#999999";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#d93025",
      urgent: "#d93025",
      medium: "#f29900",
      low: "#188038",
    };
    return colors[priority?.toLowerCase()] || "#999999";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <article className="task-item">
      <div className="task-inner">
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{task.title}</h3>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: getStatusColor(task.status),
                color: "white",
                padding: "4px 8px",
                fontSize: 12,
              }}
            >
              {task.status}
            </span>
            {task.priority && (
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: getPriorityColor(task.priority),
                  color: "white",
                  padding: "4px 8px",
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Priority: {task.priority}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#666666", whiteSpace: "nowrap" }}>
            {formatDate(task.dueDate)}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              onClick={() => onToggleComplete?.(task)}
              style={{ ...buttonStyle, backgroundColor: "#000000", color: "white" }}
            >
              {task.status?.toLowerCase() === "completed" ? "Mark Pending" : "Mark Complete"}
            </button>
            <button
              type="button"
              onClick={() => onEdit?.(task)}
              style={buttonStyle}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(task)}
              style={{ ...buttonStyle, backgroundColor: "#000000", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

const buttonStyle = {
  border: "1px solid #cccccc",
  padding: "6px 10px",
  background: "#f5f5f5",
  cursor: "pointer",
  color: "#000000",
  fontSize: 12,
};

export default TaskCard;
