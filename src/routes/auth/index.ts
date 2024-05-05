import bcrypt from "bcrypt";
import { type Request, type Response, Router } from "express";
import jwt from "jsonwebtoken";
import { safeParseAsync } from "valibot";
import { Credentials, type CredentialsOutput, Tokens } from "./validation";

const users: CredentialsOutput[] = [];

const auth = Router();

auth.post("/sign-up", async (req: Request, res: Response) => {
  const requestBody = await safeParseAsync(Credentials, req.body);

  if (!requestBody.success) {
    return res.status(400).json({ error: requestBody.issues });
  }

  const user = requestBody.output;

  const userExists = users.find((u) => {
    return u.email === user.email;
  });

  if (userExists) {
    return res.status(409).json({ message: "User exists" });
  }

  const hash = await bcrypt.hash(user.password, 10);

  users.push({
    email: user.email,
    password: hash,
  });

  return res.status(201).json({
    message: "User created",
    details: {
      email: user.email,
    },
  });
});

auth.post("/sign-in", async (req: Request, res: Response) => {
  const requestBody = await safeParseAsync(Credentials, req.body);

  if (!requestBody.success) {
    return res.status(400).json({ error: requestBody.issues });
  }

  const user = requestBody.output;

  const savedUser = users.find((u) => {
    return u.email === user.email;
  });

  if (!savedUser) {
    return res.status(401).json({
      message: "Unauthorized",
      details: {
        error: "User does not exist",
      },
    });
  }

  const passwordMatch = await bcrypt.compare(user.password, savedUser.password);

  if (!passwordMatch) {
    return res.status(403).json({
      message: "Forbidden",
      details: {
        error: "Password incorrect",
      },
    });
  }

  const payload = {
    email: user.email,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? "", {
    algorithm: "HS256",
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET ?? "", {
    algorithm: "HS256",
    expiresIn: "30d",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

auth.post("/refresh", async (req: Request, res: Response) => {
  const requestBody = await safeParseAsync(Tokens, req.body);

  if (!requestBody.success) {
    return res.status(400).json({ error: requestBody.issues });
  }

  const bodyTokens = requestBody.output;
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;
});

export default auth;
