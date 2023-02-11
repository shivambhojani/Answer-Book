/**
 * @author aman singh bhandari
 */
import { appreciationService } from "../services/index.js";

const updateAppreciation = async (req, res) => {
  const post = req.body; //appreciaiton payload
  try {
    const serviceResponse = await appreciationService.updateAppreciation(post); //update the appreciaition of a user

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const createAppreciation = async (req, res) => {
  const { userId } = req.body; //appreciation payload
  console.log("userId::" + userId);
  try {
    await appreciationService.createAppreciation(userId);

    res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get a appreciaition based on the userid
const getAppreciation = async (req, res) => {
  const { userid } = req.params; //userid
  try {
    const appreciation = await appreciationService.getAppreciation(userid);

    res.status(200).json({
      message: "ok",
      appreciation,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const incrementLikesScore = async (req, res) => {
  try {
    const body = req.body;
    await appreciationService.incrementLikesScore(body);

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

const incrementCommentsScore = async (req, res) => {
  try {
    const body = req.body;
    await appreciationService.incrementCommentsScore(body);

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

const incrementBestAnswerScore = async (req, res) => {
  try {
    const body = req.body;
    await appreciationService.incrementBestAnswerScore(body);

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

const incrementPostsScore = async (req, res) => {
  try {
    const body = req.body;
    await appreciationService.incrementPostsScore(body);

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

export const appreciationController = {
  updateAppreciation,
  getAppreciation,
  incrementLikesScore,
  createAppreciation,
  incrementCommentsScore,
  incrementBestAnswerScore,
  incrementPostsScore,
};
