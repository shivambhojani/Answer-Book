import { commentsService } from "../services/index.js";

//create comment
const postComment = async (req, res) => {
  const comment = req.body; //inject comment from the body of http
  console.log("Comments from the http body ::" + comment);
  try {
    await commentsService.insertAComment(comment);
    console.log("Successfullly added comment to database");

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get comments of a post
const getComments = async (req, res) => {
  const { postId } = req.params;
  console.log("postId receive from http params ::" + postId);
  try {
    const comments = await commentsService.getAllCommentsOfPost(postId);

    res.status(200).json({
      message: "ok",
      comments,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Put a comment of a post
const putComment = async (req, res) => {
  const comment = req.body;
  try {
    await commentsService.updateAComment(comment);

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete a comment of a post
const deleteComment = async (req, res) => {
  const { _id } = req.params;
  try {
    await commentsService.deleteAComment(_id);

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const commentsController = {
  postComment,
  getComments,
  putComment,
  deleteComment,
};
