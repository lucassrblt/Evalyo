import { Request, Response } from "express";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prismaClient";
import { externalSendMail } from "../mails/mailService";
import crypto from "crypto";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ sucess: false, message: "Passwords do not match" });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user || !user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email, token: user.token },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          email: user.email,
          id: user.id,
          createAt: user.createdAt,
          updated1t: user.updatedAt,
          active: user.active,
          token: user.token,
        },
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const id = req.params.userId;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userExists = await prisma.user.findUnique({ where: { id: id } });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!user || typeof user != "object") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (user.email !== userExists.email) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      data: {
        user: {
          email: userExists.email,
          id: userExists.id,
          createdAt: userExists.createdAt,
          updatedAt: userExists.updatedAt,
          active: userExists.active,
          token: userExists.token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to authenticate token" });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ sucess: false, message: "Passwords do not match" });
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword, active: true },
    });

    await externalSendMail(
      email,
      "Password changed",
      "Hey, just a quick mail to advertize you that your password has benne changed successfully. Enjoy using our services :)"
    );

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to change password" });
  }
};

function generateFormattedPassword() {
  const segments = 4; // Number of segments in the password
  const lengthPerSegment = 4; // Number of characters per segment
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < segments; i++) {
    let segment = "";
    const bytes = crypto.randomBytes(lengthPerSegment);
    for (let j = 0; j < lengthPerSegment; j++) {
      segment += charset[bytes[j] % charset.length];
    }
    password += segment;
    if (i < segments - 1) {
      password += "-";
    }
  }

  return password;
}

const initializeUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "An email is required to send you a register mail",
      });
    }

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "An account with this email is already existing",
      });
    }

    const password = generateFormattedPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword, active: false },
    });

    const response = await externalSendMail(
      email,
      "Welcome to Crash Test",
      `Here is your provisional password: ${password}. Join us at http://localhost:5173/connect/login`
    );

    if (response.success) {
      return res
        .status(200)
        .json({ success: true, message: "User receive provisional password" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send started email link" });
    }
  } catch (err) {}
};

const verifyInitialyze = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!tokenDecoded || typeof tokenDecoded != "object") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userExists = await prisma.user.findFirst({
      where: { email: tokenDecoded.email, active: false },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found or user already activate",
      });
    }

    return res.status(200).json({ success: true, message: "Link verified" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to verify token" });
  }
};

//TOKEN

const handleToken = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    const { token, add } = req.body;

    if (
      !token ||
      add === undefined ||
      add === null ||
      typeof add !== "boolean"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Token and add values are required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newTokenValue = add
      ? user.token + token
      : user.token - token > 0
      ? user.token - token
      : 0;

    await prisma.user.update({
      where: { id: userId },
      data: { token: newTokenValue },
    });

    res.status(200).json({
      success: true,
      message: "Token change",
      data: { token: newTokenValue },
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to manipulate token" });
  }
};

const getUserToken = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { token } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User token retrieved",
      data: { token: user.token },
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user token" });
  }
};

export {
  getUsers,
  createUser,
  loginUser,
  verifyToken,
  initializeUser,
  verifyInitialyze,
  changePassword,
  handleToken,
  getUserToken,
};
