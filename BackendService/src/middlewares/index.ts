import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = "LuddyAuth";

interface DecodedToken {
  id: string;
  role: "user" | "admin";
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, secretKey) as DecodedToken;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (role: "user" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || (req.user.role !== role && req.user.role !== "admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
