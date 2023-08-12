import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getUserInfo } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/my-account", validateToken, getUserInfo);
userRouter.put("/update-profile", );
userRouter.put("/change-password", );

export default userRouter;