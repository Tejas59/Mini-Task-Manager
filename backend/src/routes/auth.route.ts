import {
  userLoginController,
  userLogoutController,
  userRegistrationController,
} from "../controller/authController";
import authMiddleware from "@/middleware/auth";
import express, { Request, Response } from "express";

const auth = express.Router();

//register api for user
auth.post("/register", async (req: Request, res: Response) => {
  const result = await userRegistrationController(req, res);
  res.status(200).json(result);
});

//login api for user
auth.post("/login", async (req: Request, res: Response) => {
  const result = await userLoginController(req, res);
  res.status(200).json(result);
});

//logout api for user
auth.get("/logout", async (req: Request, res: Response) => {
  const result = await userLogoutController(req, res);
  res.status(200).json(result);
});

export default auth;
