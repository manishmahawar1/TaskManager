import express from "express";

const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

export default taskRouter;