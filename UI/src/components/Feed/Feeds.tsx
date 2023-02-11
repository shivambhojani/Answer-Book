import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Feed from "./Feed";
import { Container } from "@mui/system";
import Employee from "./Employee";
import { SelectChangeEvent } from "@mui/material/Select";
import useStyles from "./Style";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";
/*
 * @author: Shivangi Bhatt
 *
 */
import { bookmarkService } from "../../services/bookmark.service";

function Feeds() {
  const classes = useStyles();
  const [feeds, setFeeds] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [filter, setFilter] = useState("all");
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
  // getting all the feeds
  useEffect(() => {
    httpClient
      .get("/feeds/feeds/" + filter)
      .then((res) => {
        if (filter.toLowerCase() == "subscribed") {
          console.log("Before setting the feeds", res.data.message);
          const interimFeeds: any = res.data.message;

          for (let f of interimFeeds) {
            const fId: any = f._id;
            if (bookmarkedPosts[fId]) {
              f.bookmarkListName = bookmarkedPosts[fId];
            }
          }
          let posts = interimFeeds;

          let filteredPosts = posts.filter((post: any) =>
            subscribedTo.includes(post.userId as never)
          );
          setFeeds(filteredPosts);
        } else if (filter.toLowerCase() == "hottopics") {
          res.data.message.sort(
            (a: any, b: any) =>
              parseFloat(a.reactionCount) - parseFloat(b.reactionCount)
          );
          const interimFeeds: any = res.data.message.sort(
            (a: any, b: any) =>
              parseFloat(a.reactionCount) - parseFloat(b.reactionCount)
          );

          for (let f of interimFeeds) {
            const fId: any = f._id;
            if (bookmarkedPosts[fId]) {
              f.bookmarkListName = bookmarkedPosts[fId];
            }
          }
          setFeeds(interimFeeds);
        } else {
          console.log("Before setting the feeds", res.data.message);
          const interimFeeds: any = res.data.message;

          for (let f of interimFeeds) {
            const fId: any = f._id;
            if (bookmarkedPosts[fId]) {
              f.bookmarkListName = bookmarkedPosts[fId];
            }
          }
          setFeeds(interimFeeds);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, bookmarkedPosts, bookmarkListNames, fetchAgain]);

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

  useEffect(() => {
    httpClient
      .get("/feeds/getStarEmployees")
      .then((res) => {
        console.log("employees", res.data.message);

        setEmployees(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    // console.log("event.target.value", event.target.value);
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className={classes.flex}>
              <Typography
                variant="h5"
                component="div"
                style={{ margin: "20px" }}
              >
                My Feed{" "}
              </Typography>
              {/* The below code was referred from https://mui.com/material-ui/react-menu/#max-height-menu */}
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Filter
                </InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter"
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"hottopics"}>Hot Topics</MenuItem>
                  <MenuItem value={"social"}>Social</MenuItem>
                  <MenuItem value={"technical"}>Technical</MenuItem>
                  <MenuItem value={"subscribed"}>Subscribed</MenuItem>
                </Select>
              </FormControl>
            </div>
            {feeds.length > 0 ? (
              feeds.map((feed: any) => (
                <Feed
                  {...feed}
                  addPostToBookmarkList={addPostToBookmarkList}
                  removeFromBookmarkList={removeFromBookmarkList}
                  bookmarkListNames={bookmarkListNames}
                  filter={filter}
                  setFilter={setFilter}
                />
              ))
            ) : (
              <Card color="red">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    align="center"
                    // className={classes.text}
                  >
                    No Posts found
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="div" style={{ margin: "20px" }}>
              Star Employees{" "}
            </Typography>
            {employees.map((employee: any) => (
              <Employee {...employee} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Feeds;
