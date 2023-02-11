import { Router } from "express";
import { homeController } from "../controllers/index.js";

const homeRoute = Router();

homeRoute.get("/", homeController.homeGET);

export default homeRoute;
