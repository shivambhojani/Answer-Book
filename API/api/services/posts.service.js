import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { appreciationService } from "../services/index.js";
import { userprofileService } from "../services/index.js";
import { Post } from "../models/index.js";

// Service to get all posts
const getAllPosts = async (id) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $match: { userId: ObjectId(id) } },
  ]);

  return posts;
};

// Service to get all posts
const getTotalPosts = async () => {
  const posts = await Post.find();

  return posts;
};

// Service to get all posts
const getAllPostsByTags = async (reqBody) => {
  console.log(reqBody);
  const posts = await Post.find({ tags: { $in: reqBody } });
  console.log(posts.length);

  return posts;
};

// Service to get just one post
const getAPost = async (id) => {
  const post = await Post.findById(id);

  return post;
};

// Service to save the post
const insertAPost = async (post) => {
  const newPost = await Post.create(post);

  await newPost.save();
  const { userId } = post;

  const user = await userprofileService.getUserbyID(userId);
  console.log("%%%%%%%%%%" + user.email);

  appreciationService.incrementPostsScore({ userId });
};

// Service to delete a post by id
const deleteAPost = async (id) => {
  const post = await Post.deleteOne({ _id: id });

  console.log(post);

  return post;
};

// Service to update a post by id
const updateAPost = async (id, reqBody) => {
  console.log(id);
  console.log(reqBody);

  const post = await Post.updateOne(
    { _id: id },
    { body: reqBody.body, tags: reqBody.tags, type: reqBody.type }
  );

  return post;
};

export const postsService = {
  getAllPosts,
  getAllPostsByTags,
  getTotalPosts,
  getAPost,
  insertAPost,
  deleteAPost,
  updateAPost,
};
