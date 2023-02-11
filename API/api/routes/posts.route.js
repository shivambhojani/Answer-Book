import { Router } from "express";
import { postsController } from "../controllers/index.js";

const postsRoute = Router();

postsRoute.get("/getTotalPosts", postsController.postsTotalGET);
postsRoute.get("/getPostsByTags/:tags", postsController.postsByTagsGET);
postsRoute.get("/:id", postsController.postsGET);
postsRoute.get("/getOne/:id", postsController.postsByIDGET);
postsRoute.post("/savePost", postsController.postsPOST);
postsRoute.delete("/deletePost/:id", postsController.postsByIDDELETE);
postsRoute.put("/putPost/:id", postsController.postsByIDPUT);

export default postsRoute;
