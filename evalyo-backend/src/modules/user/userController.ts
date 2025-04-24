import { Request, Response } from "express";
import { getUsers, createUser, loginUser } from "./userService";

const getAllUsers = async (req: Request, res: Response) => {
  getUsers(req, res);
};

const register = async (req: Request, res: Response) => {
  createUser(req, res);
};

const login = async (req: Request, res: Response) => {
  loginUser(req, res);
};

export { getAllUsers, register, login };
