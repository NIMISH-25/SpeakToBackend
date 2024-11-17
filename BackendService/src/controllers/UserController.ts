import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../db/users";

const secretKey = "LuddyAuth";

export const signup = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  if (role && role !== "user" && role !== "admin") {
    return res.status(400).json({ message: "Invalid role" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
    role: role || "user",
  });

  res.status(201).json(newUser);
};


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
  res.status(200).json({ token });
};
