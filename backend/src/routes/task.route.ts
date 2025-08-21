import {
  addTaskController,
  deleteTaskController,
  getAllTaskController,
  updateTaskController,
} from "@/controller/taskController";
import authMiddleware from "@/middleware/auth";
import express, { Request, Response } from "express";

const task = express.Router();
task.use(authMiddleware);

//add task
task.post("/add", async (req: Request, res: Response) => {
  const result = addTaskController(req);
  res.status(200).json(result);
});

//get all task for userId
task.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await getAllTaskController(userId);
  res.status(200).json(result);
});

//update task using TaskID
task.put("/update/:taskId", async (req: Request, res: Response) => {
  const result = await updateTaskController(req);
  res.send(result);
});

//delete task using TaskID
task.delete("/delete/:taskId", async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const result = await deleteTaskController(taskId);
  res.send(result);
});

export default task;
