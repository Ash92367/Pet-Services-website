import express from 'express';
import { loginuser, registeruser } from "../controllers/UserController.js";

const userRouter = express.Router();

// Routes
userRouter.post("/login", loginuser);
userRouter.post("/register", registeruser);

export default userRouter;
