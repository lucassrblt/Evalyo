import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import jwt from "jsonwebtoken";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, deadline } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const decoded = decodedToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, error: "Unable to determine user" });
    }

    if (!title || !status) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all required fields" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || "",
        status,
        userId: decoded.id,
        deadline: deadline || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const decoded = decodedToken(token);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, error: "Unable to determine user" });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!userExists) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log(decoded.id);

    const tasks = await prisma.task.findMany({
      where: {
        userId: decoded.id,
      },
    });

    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const decoded = decodedToken(token);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, error: "Unable to determine user" });
    }

    const task = await prisma.task.findUnique({
      where: {
        id,
        userId: decoded.id,
      },
    });

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to delete task" });
  }
};

const updateTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const decoded = decodedToken(token);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, error: "Unable to determine user" });
    }

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description: description || "",
        status,
        deadline: deadline || null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update task" });
  }
};

const decodedToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (typeof decoded === "object" && "id" in decoded) {
    return decoded as { id: string };
  }
  return null;
};

export { createTask, getTasks, deleteTask, updateTasks };
