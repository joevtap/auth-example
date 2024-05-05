import { Router } from "express";
import authMiddleware from "./middlewares/auth";
import auth from "./routes/auth";
import protectedResource from "./routes/resources/protected-example";

const router = Router();

router.use("/auth", auth);
router.use("/protected", authMiddleware, protectedResource);

export default router;
