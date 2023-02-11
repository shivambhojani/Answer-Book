/**
 * @author aman singh bhandari
 */
import { Appreciation, Offer_appreciation } from "../models/index.js";

// Service to save the post
const updateAppreciation = async (appreciation) => {
  const appreciationSet = await Appreciation.updateOne(appreciation); //update the single record of appreciaiton
};

const createAppreciation = async (userId) => {
  console.log("creating apprecation :: with userid ::" + userId);
  const appreciation = {
    userId,
    likesScore: 0,
    commentsScore: 0,
    bestAnswerScore: 0,
    postsScore: 0,
    badge: "beginner",
  };
  const appreciationSet = await Appreciation.create(appreciation); //create the appreciaiton document
  await appreciationSet.save();
};

const getAppreciation = async (userid) => {
  const appreciation = await Appreciation.findOne({ userId: userid }); //get appreciaiton baswed on userid
  return appreciation;
};

//add appreciation on like
const incrementLikesScore = async (user) => {
  const userid = user.userId;

  const appreciation = await Appreciation.findOne({
    userId: userid,
  });
  //get the scores offered and add it in the appreciation of the user
  const scores_offered = await Offer_appreciation.find(); //offered score
  const score_offered = scores_offered[0];
  if (appreciation) {
    appreciation.likesScore =
      appreciation.likesScore + score_offered.likesScore;
    await Appreciation.updateOne({ userId: appreciation.userId }, appreciation);
  } else {
    createAppreciation(userid);
  }
};

//add appreciation on comment
const incrementCommentsScore = async (user) => {
  const userid = user.userId;
  const appreciation = await Appreciation.findOne({
    userId: userid,
  });
  //get the scores offered and add it in the appreciation of the user

  const scores_offered = await Offer_appreciation.find(); //offered score
  const score_offered = scores_offered[0];
  appreciation.commentsScore =
    appreciation.commentsScore + score_offered.commentsScore; //add the score
  await Appreciation.updateOne({ userId: appreciation.userId }, appreciation);
};

//add appreciation on bestanswer
const incrementBestAnswerScore = async (user) => {
  const userid = user.userId;
  const appreciation = await Appreciation.findOne({
    userId: userid,
  });
  //get the scores offered and add it in the appreciation of the user

  const scores_offered = await Offer_appreciation.find(); //offered score
  const score_offered = scores_offered[0];
  appreciation.bestAnswerScore =
    appreciation.bestAnswerScore + score_offered.bestAnswerScore; //add the score
  await Appreciation.updateOne({ userId: appreciation.userId }, appreciation);
};

const incrementPostsScore = async (user) => {
  const userid = user.userId;
  console.log("hehe" + userid);

  const appreciation = await Appreciation.findOne({
    userId: userid,
  });
  //get the scores offered and add it in the appreciation of the user

  const scores_offered = await Offer_appreciation.find(); //offered score
  const score_offered = scores_offered[0];
  appreciation.postsScore = appreciation.postsScore + score_offered.postsScore; //add the score
  await Appreciation.updateOne({ userId: appreciation.userId }, appreciation);
};

export const appreciationService = {
  updateAppreciation,
  getAppreciation,
  incrementLikesScore,
  createAppreciation,
  incrementCommentsScore,
  incrementBestAnswerScore,
  incrementPostsScore,
};
