import { TaskModel } from "../models/taskModel";
import { Request, Response } from "express";

export const getAllTaskController = async (userId: string) => {
  const tasks = await TaskModel.find({ userId });
  return tasks;
};

export const addTaskController = async (req: Request) => {
  const { description, title, status, userId } = req.body;
  await TaskModel.insertOne({
    description: description,
    status: status,
    title: title,
    userId: userId,
  });

  return { success: true };
};

export const updateTaskController = async (req: Request, ) => {
  const taskId = req.params.taskId; 
  const { description, title, status, userId } = req.body;

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    { description, title, status, userId },
    { new: true }
  );

  if (!updatedTask) {
    return ({ message: "Task not found" });
  }

  return ({
    message: "Task updated successfully",
    task: updatedTask,
  });
};
