import { type Request, type Response, Router } from "express";

const resource = Router();

resource.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Protected resource" });
});

export default resource;
