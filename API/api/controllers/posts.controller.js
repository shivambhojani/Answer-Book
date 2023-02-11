import { postsService } from "../services/index.js";

// Get all posts
const postsGET = async (req, res) => {
  const { id } = req.params;
  console.log("In postsGET-->", id);

  try {
    const posts = await postsService.getAllPosts(id);
    console.log(posts);

    res.status(200).json({
      message: "ok",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get all posts
const postsTotalGET = async (req, res) => {
  
  try {
    const posts = await postsService.getTotalPosts();
    console.log(posts);

    res.status(200).json({
      message: "ok",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get all posts with tags
const postsByTagsGET = async (req, res) => {
  const tags_string = req.params.tags;
  const tags = tags_string.split(",")
  console.log("In postsByTagsGET->", tags);

  try {
    const posts = await postsService.getAllPostsByTags(tags);
    console.log(posts);

    res.status(200).json({
      message: "ok",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get a post based on the id
const postsByIDGET = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postsService.getAPost(id);

    res.status(200).json({
      message: "ok",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Post a new post
const postsPOST = async (req, res) => {
  const post = req.body;

  console.log(post);

  try {
    const serviceResponse = await postsService.insertAPost(post);

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete a post based on the id
const postsByIDDELETE = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const post = await postsService.deleteAPost(id);

    res.status(200).json({
      message: "ok",
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update a post based on the id
const postsByIDPUT = async (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;

  try {
    const updateResponse = await postsService.updateAPost(id, reqBody);

    res.status(200).json({
      message: "ok",
      updateResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const postsController = {
  postsGET,
  postsByIDGET,
  postsByTagsGET,
  postsTotalGET,
  postsPOST,
  postsByIDDELETE,
  postsByIDPUT,
};
