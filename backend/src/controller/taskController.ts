import { UserModel } from "@/models/userModel";
import { TaskModel } from "../models/taskModel";
import { Request, Response } from "express";

export const getAllTaskController = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return { message: "User does not exist" };
  }
  const tasks = await TaskModel.find({ userId });
  return tasks;
};

export const addTaskController = async (req: Request) => {
  const { description, title, status, userId } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    return { message: "User does not exist" };
  }
  
  await TaskModel.insertOne({
    description: description,
    status: status,
    title: title,
    userId: userId,
  });

  return { success: true };
};

export const updateTaskController = async (req: Request) => {
  const taskId = req.params.taskId;
  const { description, title, status, userId } = req.body;

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    { description, title, status, userId },
    { new: true }
  );

  if (!updatedTask) {
    return { message: "Task not found" };
  }

  return {
    message: "Task updated successfully",
    task: updatedTask,
  };
};

export const deleteTaskController = async (taskId: string) => {
  const deletedTask = await TaskModel.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return { message: "Task not found" };
  }

  return {
    message: "Task Deleted successfully",
    task: deletedTask,
  };
};
