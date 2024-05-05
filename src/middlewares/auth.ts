import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerToken = req.headers.authorization
    ? req.headers.authorization?.split(" ")[1]
    : null;

  if (bearerToken) {
    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET ?? "");

      res.locals = {
        user: decoded,
      };

      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
  }

  return res.status(401).json({ message: "Unauthorized" });
}
