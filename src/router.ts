import { Router } from "express";
import authMiddleware from "./middlewares/auth";
import cookieToAuthorization from "./middlewares/cookie-to-authorization";
import auth from "./routes/auth";
import protectedResource from "./routes/resources/protected-example";

const router = Router();

router.use("/auth", auth);
router.use(
  "/protected",
  cookieToAuthorization,
  authMiddleware,
  protectedResource,
);

export default router;
