import tasks  from "../models/taskModel.js"


export const getTasks = (req, res) => {
  res.json(tasks);
};


export const createTask = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date().toLocaleDateString(),
  };

  tasks.unshift(newTask);

  res.status(201).json(newTask);
};


export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body || {};

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};
export const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted" });
};