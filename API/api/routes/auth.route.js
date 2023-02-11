import { Router } from "express";
import { authController } from "../controllers/index.js";

const authRoute = Router();

authRoute.post("/login", authController.loginUser);
authRoute.post("/register", authController.registerUser);
authRoute.post("/request-password-reset", authController.requestForgotPassword);
authRoute.post("/reset-password", authController.resetPassword);
authRoute.get("/sns/:email", authController.snsNotify);

export default authRoute;
