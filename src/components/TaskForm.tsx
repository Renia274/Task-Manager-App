import React, { useState, useEffect } from "react";
import { Task } from "../types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onDeleteAll: () => void;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onDeleteAll, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Task = {
      id: task ? task.id : Date.now(),
      title,
      description,
      status: status || "in progress",
    };
    onSubmit(updatedTask);
    setTitle("");
    setDescription("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      {task && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        >
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}
      <button
        type="submit"
        style={{
          backgroundColor: "dodgerblue",
          color: "white",
          padding: "0.5rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        {task ? "Update Task" : "Add Task"}
      </button>
      <button className="delete-all-button" onClick={onDeleteAll}>
        Delete All
      </button>
    </form>
  );
};

export default TaskForm;
