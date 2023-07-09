import React, { useState, useEffect } from "react";
import { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./components/styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setShowDropdown(true);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTaskHandler = (editedTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      return updatedTasks;
    });
    setShowDropdown(true);
  };

  const updateTaskStatus = (id: number, status: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      return updatedTasks;
    });
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <TaskForm onSubmit={addTask} onDeleteAll={deleteAllTasks} />
      </div>
      <TaskList
        tasks={tasks}
        onUpdateStatus={updateTaskStatus}
        onDelete={deleteTask}
        onEdit={editTaskHandler}
      />
    </div>
  );
};

export default App;
