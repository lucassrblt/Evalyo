import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(token, process.env.JWT_LUCAS_SECRET as string) as any;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
