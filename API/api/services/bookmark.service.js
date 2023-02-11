/**
 * Author: Saurabh Jayeshbhai Das <sr850847@dal.ca>
 * Feature: Bookmark Management
 */
import { AuthUser } from "../models/index.js";

const getBookmarkListOfUser = async userId => {
  try {
    const user = await AuthUser.findById(userId);

    return user.bookmarkLists;
  } catch (error) {
    return error;
  }
};

const addPostToBookmarkList = async (userId, postId, addToBookmarkListName) => {
  try {
    const user = await AuthUser.findById(userId);

    for (let bmList of user.bookmarkLists) {
      if (bmList.bookmarkListName === addToBookmarkListName) {
        bmList.postIds.push(postId);
        user.save();
        return `Added to list ${addToBookmarkListName}`;
      }
    }

    user.bookmarkLists.push({
      bookmarkListName: addToBookmarkListName,
      postIds: [postId],
    });
    user.save();
    return `Created new list ${addToBookmarkListName}`;
  } catch (error) {
    return error;
  }
};

const removePostFromBookmarkList = async (
  userId,
  postId,
  removeFromBookmarkListName,
) => {
  try {
    const user = await AuthUser.findById(userId);

    for (let bmList of user.bookmarkLists) {
      if (bmList.bookmarkListName === removeFromBookmarkListName) {
        bmList.postIds.splice(bmList.postIds.indexOf(postId), 1);
        break;
      }
    }

    // Check if there are no other postIds in the bookmark list, if so, remove the whole list
    let listIndexToRemove = -1;
    for (let i = 0; i < user.bookmarkLists.length; i++) {
      if (
        user.bookmarkLists[i].bookmarkListName === removeFromBookmarkListName &&
        user.bookmarkLists[i].postIds.length === 0
      ) {
        listIndexToRemove = i;
        break;
      }
    }
    if (listIndexToRemove !== -1) {
      user.bookmarkLists.splice(listIndexToRemove, 1);
      console.log(
        `Deleting the as their are no more posts in list ${removeFromBookmarkListName}`,
      );
    }
    user.save();
    return `Removed from list ${removeFromBookmarkListName}`;
  } catch (error) {
    return error;
  }
};

export const bookmarkService = {
  getBookmarkListOfUser,
  addPostToBookmarkList,
  removePostFromBookmarkList,
};
