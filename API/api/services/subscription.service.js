/*
 * @author: Shivangi Bhatt
 * @description: Subscription service
 */

import User from "../models/auth.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Service to subscribe to a user
const subscribeUser = async (loggedInUserId, SubscribeToUserId) => {
  console.log("SubscribeToUserId", SubscribeToUserId);

  const user = await User.updateOne(
    { _id: loggedInUserId },
    {
      $push: {
        subscribedTo: SubscribeToUserId,
      },
    }
  );
  return user;
};

// Service to unsubscribe to a user

const unsubscribeUser = async (loggedInUserId, SubscribeToUserId) => {
  const user = await User.updateOne(
    { _id: loggedInUserId },
    {
      $pull: {
        subscribedTo: SubscribeToUserId,
      },
    }
  );
  return user;
};

const getAllSubscribedUSer = async (userId) => {
  console.log("userId,=-=-=-=-", userId);
  let subscribedUsers = [];
  const user = await User.findById(userId);
  const users = await User.aggregate([
    { $match: { _id: ObjectId(userId) } },
    {
      $lookup: {
        from: "users",
        localField: "subscribedTo",
        foreignField: "_id",
        as: "subscribedUsers",
      },
    },
    { $unwind: "$subscribedUsers" },

    {
      $lookup: {
        from: "userimage1",
        localField: "subscribedUsers.email",
        foreignField: "email",
        as: "images",
      },
    },
    { $unwind: { path: "$images", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $or: [
          { "images.email": "subscribedUsers.email" },
          { "images.0": { $exists: false } },
        ],
      },
    },
  ]);
  return users;
  // if (user) {
  //   user.subscribedTo.map(async (subscribed) => {
  //     let subscribedUser = await User.aggregate([
  //       { $match: { _id: ObjectId(subscribed) } },

  //       {
  //         $lookup: {
  //           from: "userimage1",
  //           localField: "email",
  //           foreignField: "email",
  //           as: "images",
  //         },
  //       },
  //       { $unwind: { path: "$images", preserveNullAndEmptyArrays: true } },
  //       {
  //         $match: {
  //           $or: [
  //             { "images.email": "user.email" },
  //             { "images.0": { $exists: false } },
  //           ],
  //         },
  //       },
  //     ]);
  //     subscribedUsers.push(subscribedUser);
  //     if (subscribedUsers.length() == user.subscribedTo.length) {
  //       return subscribedUsers;
  //     }
  //   });
};

export const subscriptionService = {
  subscribeUser,
  unsubscribeUser,
  getAllSubscribedUSer,
};
