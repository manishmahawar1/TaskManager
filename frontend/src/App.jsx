import React, { useEffect, useState } from "react";
import API from "./api";
import TaskItem from "./components/TaskItem";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await API.patch(`/tasks/${task.id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  const handleEdit = async (id, newTitle) => {
    await API.patch(`/tasks/${id}`, { title: newTitle });
    fetchTasks();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="w-full max-w-2xl">

        <h1 className="text-3xl text-center mb-6 font-bold">Task Manager</h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter task..."
            required
          />
          <button className="bg-blue-500 text-white px-4 rounded">
            Add
          </button>
        </form>

        <div className="flex flex-col gap-3">
          {tasks.length === 0 ? (
            <p className="text-center">No tasks</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App;