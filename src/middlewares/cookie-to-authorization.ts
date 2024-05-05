import type { NextFunction, Request, Response } from "express";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const access_token = await req.cookies.access_token;

  if (access_token) {
    req.headers.authorization = `Bearer ${access_token}`;
  }

  next();
}
