import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

const apiRouter = express.Router();

apiRouter.get("/tasks", getTasks);
apiRouter.post("/tasks", createTask);
apiRouter.patch("/tasks/:id", updateTask);
apiRouter.delete("/tasks/:id", deleteTask);

export default apiRouter;