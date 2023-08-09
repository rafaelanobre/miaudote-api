import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js"
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema), signIn);
authRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default authRouter;