/**
 * @author aman singh bhandari
 */
import { Router } from "express";
import { appreciationController } from "../controllers/index.js";

const appreciationRoute = Router();

appreciationRoute.post("/", appreciationController.createAppreciation); //create appreciation
appreciationRoute.put("/", appreciationController.updateAppreciation); //update appreciation
appreciationRoute.get("/:userid", appreciationController.getAppreciation); //get appreciation
appreciationRoute.put("/likes", appreciationController.incrementLikesScore); //update scores from like
appreciationRoute.put(
  "/comments",
  appreciationController.incrementCommentsScore
); //update scores from comments
appreciationRoute.put(
  "/bestanswer",
  appreciationController.incrementBestAnswerScore
); //update scores from best answers
appreciationRoute.put("/posts", appreciationController.incrementPostsScore); //update score from posts

export default appreciationRoute;
