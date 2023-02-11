/**
 * @author aman singh bhandari
 */
import { Router } from "express";
import { commentsController } from "../controllers/index.js";

const commentsRoute = Router();

commentsRoute.post("/", commentsController.postComment); //create comment
commentsRoute.get("/:postId", commentsController.getComments); //get comments of a post
commentsRoute.put("/", commentsController.putComment); //create comment
commentsRoute.delete("/:_id", commentsController.deleteComment); //create comment

export default commentsRoute;
