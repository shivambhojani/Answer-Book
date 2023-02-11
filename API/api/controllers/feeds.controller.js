/*
 * @author: Shivangi Bhatt
 * @description: Controllers for feeds
 */
import { feedService } from "../services/index.js";

// Get all feeds based on filter
const getFeeds = async (req, res) => {
  try {
    const { filter } = req.params;

    if (filter.toLowerCase() == "social") {
      const posts = await feedService.getAllSocialPosts();
      res.status(200).json({
        status: true,
        message: posts,
      });
    } else if (filter.toLowerCase() == "technical") {
      const posts = await feedService.getAllTechnicalPosts();

      res.status(200).json({
        status: true,
        message: posts,
      });
    } else if (filter.toLowerCase() == "subscribed") {
      const posts = await feedService.getAllSubscribedPosts();

      res.status(200).json({
        status: true,
        message: posts,
      });
    } else if (filter.toLowerCase() == "hottopics") {
      const posts = await feedService.getHotTopics();

      res.status(200).json({
        status: true,
        message: posts,
      });
    } else {
      const posts = await feedService.getAllPosts();
      console.log("posts", posts);

      res.status(200).json({
        status: true,
        message: posts,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

// Provide reactions to posts

const addReactions = async (req, res) => {
  const { id } = req.params;
  const { reaction, userId, userName } = req.body;
  try {
    await feedService.addReactions(id, reaction, userId, userName);

    res.status(200).json({
      status: true,
      message: "Reaction added",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

// Get top 5 star employees

const getStarEmployees = async (req, res) => {
  try {
    const starEmployees = await feedService.getStarEmployees();

    res.status(200).json({
      status: true,
      message: starEmployees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const feedsController = {
  getFeeds,
  addReactions,
  getStarEmployees,
};
