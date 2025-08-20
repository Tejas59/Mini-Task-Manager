import {
  addTaskController,
  getAllTaskController,
  updateTaskController,
} from "@/controller/taskController";
import authMiddleware from "@/middleware/auth";
import express, { Request, Response } from "express";

const task = express.Router();
task.use(authMiddleware);

task.post("/add", async (req: Request, res: Response) => {
  const result = addTaskController(req);
  res.status(200).json(result);
});

task.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await getAllTaskController(userId);
  res.status(200).json(result);
});

task.put("/update/:taskId", async (req: Request, res: Response)=>{
  const result = await updateTaskController(req);
  res.send(result)
})

export default task;
