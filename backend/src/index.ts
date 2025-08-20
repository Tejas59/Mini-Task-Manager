import express, { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/", async (req: Request, res: Response) => {
  res.status(200).json("Inital api");
});

const APP_PORT = process.env.APP_PORT || 5000;
app.listen(APP_PORT, () => {
  console.log(`server is running on the port ${APP_PORT}`);
});
