/**
 * Author: Saurabh Jayeshbhai Das <sr850847@dal.ca>
 * Feature: Bookmark Management
 */
import { bookmarkService } from "../services/index.js";

const getBookmarkListOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const resFromService = await bookmarkService.getBookmarkListOfUser(userId);

    res.status(200).json({
      message: `Getting all bookmarks for the user ${userId}`,
      data: resFromService,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const addPostToBookmarkList = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId, bookmarkListName } = req.body;

    console.log(
      `Will add to Post ${postId}; with bookmarkList named ${bookmarkListName} for the user ${userId}`,
    );
    const resFromService = await bookmarkService.addPostToBookmarkList(
      userId,
      postId,
      bookmarkListName,
    );

    res.status(200).json({
      message: `Post ${postId} added to bookmarkList named ${bookmarkListName} for the user ${userId}`,
      response: resFromService,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};

const removePostFromBookmarkList = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId, bookmarkListName } = req.body;
    const resFromService = await bookmarkService.removePostFromBookmarkList(
      userId,
      postId,
      bookmarkListName,
    );

    res.status(200).json({
      message: `Post ${postId} removed from bookmarkList named ${bookmarkListName} for the user ${userId}`,
      response: resFromService,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const bookmarkController = {
  getBookmarkListOfUser,
  addPostToBookmarkList,
  removePostFromBookmarkList,
};
