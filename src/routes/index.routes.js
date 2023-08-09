import { Router } from "express"
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import petsRouter from "./pets.routes.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(petsRouter);

export default router;