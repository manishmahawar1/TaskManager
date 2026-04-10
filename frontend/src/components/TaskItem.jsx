import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, newTitle);
    setIsEditing(false);
  
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 bg-white rounded shadow">

      <div className="flex gap-3 items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />

        <div>
          {isEditing ? (
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-1"
            />
          ) : (
            <p className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </p>
          )}

          <p className="text-sm text-gray-500">
            {task.createdAt}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-2 sm:mt-0">
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded">
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default TaskItem;