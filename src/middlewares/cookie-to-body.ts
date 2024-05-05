import type { NextFunction, Request, Response } from "express";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const refresh_token = await req.cookies.refresh_token;

  if (refresh_token) {
    req.body = {
      refresh_token,
    };
  }

  next();
}
