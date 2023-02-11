import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { appreciationService } from "../services/index.js";

import { Comment } from "../models/index.js";

// Service to save the comment
const insertAComment = async (comment) => {
  const newComment = await Comment.create(comment);
  await newComment.save(async (err, data) => {
    if (err) {
      console.log("error====" + err);
    } else {
      console.log("success::::" + data);
    }
  });
  const { userId } = comment;
  appreciationService.incrementCommentsScore({ userId });
};

// Retreive all the comments in a post
const getAllCommentsOfPost = async (postId) => {
  const comments = await Comment.find({ postId });
  return comments;
};

// Service to save the comment
const updateAComment = async (comment) => {
  const { isBestAnswer } = await Comment.findOne({ _id: comment._id });
  const isBeforeBestAns = isBestAnswer;

  console.log("http body:::" + comment);
  await Comment.updateOne({ _id: comment._id }, comment);
  console.log("new answer::" + comment.isBestAnswer);
  console.log("old answer::" + isBeforeBestAns);

  if (comment.isBestAnswer === true && isBeforeBestAns === false) {
    //If the best answer is present in update request and is true
    //userId must be present inside the update comment call########### IMPORTANT!!!
    await appreciationService.incrementBestAnswerScore(comment);
  }
};

// Service to delete the comment
const deleteAComment = async (id) => {
  await Comment.deleteOne({ _id: id });
};

export const commentsService = {
  insertAComment,
  getAllCommentsOfPost,
  updateAComment,
  deleteAComment,
};
