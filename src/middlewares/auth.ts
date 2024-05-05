import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
  const access_token = req.cookies.access_token;
  const bearerToken = req.headers.authorization
    ? req.headers.authorization?.split(" ")[1]
    : null;

  if (access_token) {
    try {
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET ?? "");

      res.locals = {
        user: decoded,
      };

      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
  }

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

  next();
}
