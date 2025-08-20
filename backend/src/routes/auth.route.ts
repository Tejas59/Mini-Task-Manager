import {
  userLoginController,
  userLogoutController,
  userRegistrationController,
} from "../controller/authController";
import authMiddleware from "@/middleware/auth";
import express, { Request, Response } from "express";

const auth = express.Router();

auth.post("/register", async (req: Request, res: Response) => {
  const result = await userRegistrationController(req, res);
  res.status(200).json(result);
});

auth.post("/login", async (req: Request, res: Response) => {
  const result = await userLoginController(req, res);
  res.status(200).json(result);
});

auth.get("/logout", async (req: Request, res: Response) => {
  const result = await userLogoutController(res);
  res.status(200).json(result);
});

export default auth;
