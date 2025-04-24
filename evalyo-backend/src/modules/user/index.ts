import { Router } from "express";
import { getAllUsers, login } from "./userController";
import authMiddleware from "../../middlewares/authMiddleware";
import {
  initializeUser,
  getUserToken,
  verifyToken,
  verifyInitialyze,
  changePassword,
  handleToken,
} from "./userService";
import { Request, Response } from "express";
import { getQuizzByUserId } from "../quizz/quizzService";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/login", login);
userRouter.post("/change-password", (req: Request, res: Response) => {
  changePassword(req, res);
});
userRouter.post("/initialize", (req: Request, res: Response) => {
  initializeUser(req, res);
});

userRouter.post("/verify-initialyze", (req: Request, res: Response) => {
  verifyInitialyze(req, res);
});

userRouter.get("/verify-token/:userId", authMiddleware, (req, res) => {
  try {
    verifyToken(req, res);
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// TOKEN

userRouter.get("/:userId/token", (req: Request, res: Response) => {
  getUserToken(req, res);
});

userRouter.put("/:userId/token", (req: Request, res: Response) => {
  handleToken(req, res);
});

// Quizz
userRouter.get("/:userId/quizz", (req: Request, res: Response) => {
  getQuizzByUserId(req, res);
});

export default userRouter;
