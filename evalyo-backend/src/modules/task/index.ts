import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTasks } from "./taskService";

const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  getTasks(req, res);
});

taskRouter.post("/", (req, res) => {
  createTask(req, res);
});

taskRouter.delete("/:id", (req, res) => {
  deleteTask(req, res);
});

taskRouter.put("/:id", (req, res) => {
  updateTasks(req, res);
});

export default taskRouter;
