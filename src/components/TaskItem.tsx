import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateStatus,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setEditedStatus(newStatus);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = {
      ...editedTask,
      status: editedStatus,
    };
    onEdit(updatedTask);
    setIsEditing(false);
    if (editedStatus !== task.status && editedStatus === "completed") {
      onUpdateStatus(task.id, editedStatus);
    }
  };

  const handleCancelClick = () => {
    setEditedTask(task);
    setEditedStatus(task.status);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
          <select value={editedStatus} onChange={handleStatusChange}>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Status: {editedStatus === task.status ? task.status : editedStatus}
            <select value={editedStatus} onChange={handleStatusChange}>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
