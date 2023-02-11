/*
 * @author: Shivangi Bhatt
 * @description: Routes for subscription
 */

import { Router } from "express";
import { subscriptionController } from "../controllers/index.js";

const subscriptionRoute = Router();

subscriptionRoute.post("/subscribeUser", subscriptionController.subscribeUser);
subscriptionRoute.post(
  "/unSubscribeUser",
  subscriptionController.unSubscribeUser
);
subscriptionRoute.get(
  "/getAllSubscribedUser/:id",
  subscriptionController.getAllSubscribedUSer
);

export default subscriptionRoute;
