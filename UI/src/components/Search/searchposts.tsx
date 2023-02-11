import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../ProfilePage/MyFriends";
import httpClient from "../../thunk/interceptor";
import { Container } from "@mui/system";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";

import UtilityUser from "../Utility/UtilityUser";
/*
 * @author: Shivangi Bhatt
 *
 */
import { bookmarkService } from "../../services/bookmark.service";
import Feed from "../Feed/Feed";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}
export interface feed {
  initials: string;
  image?: any;
  username: string;
  createdOn: string;
  body: string;
  topic: string;
  tags: Array<string>;
  type: string;
  user: any;
  _id: string;
  reactions: any;
  bookmarkListName: string;
  addPostToBookmarkList: (
    postId: string,
    addPostToBookmarkListName: string
  ) => any;
  removeFromBookmarkList: (
    postId: string,
    removeFromBookmarkListName: string
  ) => any;
  bookmarkListNames: Array<{
    id: string;
    name: string;
    inputValue: string;
    getOptionLabel: string;
  }>;
}

export default function SearchPosts() {
  const [feed, setFeed] = useState();

  const [posts, setposts] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  const [data, setData] = React.useState<any[]>();
  const [currentUserId, setCurrentUserId] = useState("");
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any>({});
  const [bookmarkListNames, setBookmarkListNames] = useState<any>([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [subscribedTo, setSubscribedTo] = useState([]);

  // get the user details to check out the bookmark lists and subscribed users
  useEffect(() => {
    UtilityUser().then(function (response) {
      setSubscribedTo(response.user.subscribedTo);
      console.log("User fetched for bms:", response.user);
      setCurrentUserId(response.user._id);
    });
  }, []);

  useEffect(() => {
    bookmarkService
      .getBookmarkListOfUser(currentUserId)
      .then((result) => {
        console.log("bmLists:::", result);
        const bookmarkLists = result.data;
        const bmPosts: any = {};
        const bmListNames: any = [];
        let i = 0;

        for (let bmList of bookmarkLists) {
          const bmListName = bmList.bookmarkListName;
          const postIds = bmList.postIds;

          bmListNames.push({
            id: ++i,
            name: bmListName,
            inputValue: "",
            getOptionLabel: "",
          });
          for (let postId of postIds) {
            bmPosts[postId] = bmListName;
          }
        }

        console.log("bmPostsMap::", bmPosts);
        setBookmarkedPosts(bmPosts);
        console.log("bmPostListNames::", bmListNames);
        setBookmarkListNames(bmListNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserId, fetchAgain]);
  const redirectToPost = (feed: any) => {
    navigate("/post", {
      state: {
        feed: JSON.parse(JSON.stringify(feed)),
      },
    });
  };
  const addPostToBookmarkList = async (
    postId: string,
    addPostToBookmarkListName: string
  ) => {
    console.log(
      `Will add post ${postId} to bmList ${addPostToBookmarkListName} for the user ${currentUserId}`
    );
    bookmarkService
      .addPostToBookmarkList(currentUserId, postId, addPostToBookmarkListName)
      .then((result) => {
        console.log("Res in frontend after adding the bookmark", result);
        setFetchAgain((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromBookmarkList = async (
    postId: string,
    removeFromBookmarkListName: string
  ) => {
    console.log(
      `Will delete post ${postId} from bmList ${removeFromBookmarkListName} for the user ${currentUserId}`
    );
    bookmarkService
      .removePostFromBookmarkList(
        currentUserId,
        postId,
        removeFromBookmarkListName
      )
      .then((result) => {
        console.log("Res in frontend after deleting the bookmark", result);
        setFetchAgain((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Reference taken from https://masteringjs.io/tutorials/fundamentals/filter-array-of-objects
    // console.log("posts", posts);
    const filteredUsersTemp = posts.filter((post) =>
      post.topic.toLowerCase().startsWith(search.toLowerCase())
    );
    console.log(search);
    setFilteredUsers(filteredUsersTemp);
    console.log("filteredUsersTemp", filteredUsersTemp);
  }, [search]);

  const fetchData = (): void => {
    console.log("Fetch Data");
    httpClient
      .get("/feeds/feeds/all")
      .then((res: any) => {
        // console.log(result.data.posts);
        // setposts(result.data.posts);
        const interimFeeds: any = res.data.message;

        for (let f of interimFeeds) {
          const fId: any = f._id;
          if (bookmarkedPosts[fId]) {
            f.bookmarkListName = bookmarkedPosts[fId];
          }
        }
        setposts(interimFeeds);
      })
      .catch((err) => {
        setposts(err.response.data.message);
        console.error(err);
        alert("Something wrong with API");
      });
  };

  function openUserProfile(emailid: any) {
    navigate("/openprofile/" + emailid);
  }

  const renderUsers = (postArray: any) => {
    return postArray.map((post: any) => {
      let feed = {
        ...post,
        addPostToBookmarkList: { addPostToBookmarkList },
        removeFromBookmarkList: { removeFromBookmarkList },
        bookmarkListNames: bookmarkListNames,
      };

      return (
        // <Feed
        //   {...post}
        //   addPostToBookmarkList={addPostToBookmarkList}
        //   removeFromBookmarkList={removeFromBookmarkList}
        //   bookmarkListNames={bookmarkListNames}
        // />
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardActionArea onClick={() => redirectToPost(feed)}>
              <CardContent>
                {/* <img style={{ width: "100%" }} src={post.picture} /> */}
                <Typography variant="h6" gutterBottom component={"p"}>
                  {post.topic}
                </Typography>
                {/* <Typography variant="subtitle1" component={"p"}>
                                    Email: {post.email}
                                </Typography>
                                <Typography variant="subtitle1" component={"p"}>
                                    Mobile: {post.mobile}
                                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  };
  return (
    <>
      <Container>
        <Grid container spacing={2} m={5}>
          <TextField
            label="Search By Topic"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {search.length != 0 ? (
            <>
              {filteredUsers.length != 0
                ? renderUsers(filteredUsers)
                : "No Posts Idea"}
            </>
          ) : (
            renderUsers(posts)
          )}
        </Grid>
      </Container>
    </>
  );
}
