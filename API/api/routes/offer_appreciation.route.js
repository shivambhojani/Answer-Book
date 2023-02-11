/**
 * @author aman singh bhandari
 */
import { Router } from "express";
import { offer_appreciationController } from "../controllers/index.js";

const offer_appreciationRoute = Router();

offer_appreciationRoute.put(
  "/",
  offer_appreciationController.updateAppreciation
); //update appreciation offer
offer_appreciationRoute.get("/", offer_appreciationController.getAppreciation); //get appreciation offer

export default offer_appreciationRoute;
