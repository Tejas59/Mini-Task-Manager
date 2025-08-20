import express from "express";
import auth from "./auth.route";
import task from "./task.route";

const router = express.Router();

router.use("/auth", auth);
router.use("/task",task)

export default router;
