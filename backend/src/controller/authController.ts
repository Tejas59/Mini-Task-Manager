import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/userModel";
import jwt from "jsonwebtoken";

export const userRegistrationController = async (
  req: Request,
  res: Response
) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return ({ success: false, message: "Invalid data" });
  }
  const existingUser  = await UserModel.findOne({ email });
  if (existingUser ) {
    return { success: false, message: "User alerady exist" };
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({ name, email, password: hashPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return { success: true };
};

export const userLoginController = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return {
      success: false,
      message: "Password and email are required",
    };
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "User does not exist for this email",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return { success: false, message: "Incorrect password" };
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    success: true,
    message: "Login successful",
    user: { id: user._id, email: user.email, name: user.name },
  };
};

export const userLogoutController = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  return { success: true, message: "Logged out" };
};
