import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../thunk/interceptor";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UtilityUser from "../Utility/UtilityUser";
import { bookmarkService } from "../../services/bookmark.service";
import Divider from '@mui/material/Divider';

interface bmListType {
  bmListName: string;
  posts: any[];
}

interface feedType {
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

const MyBookmarkLists: React.FC = () => {
  // const [feeds, setFeeds] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [bookmarkLists, setBookmarkLists] = useState<bmListType[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any>({});
  const [bookmarkListNames, setBookmarkListNames] = useState<any>([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [feeds, setFeeds] = useState<feedType[]>([]);
  const navigate = useNavigate();

  // get the user details to check out the bookmark lists
  useEffect(() => {
    UtilityUser().then(function (response) {
      setCurrentUserId(response.user._id);
    });
  }, []);

  useEffect(() => {
    bookmarkService
      .getBookmarkListOfUser(currentUserId)
      .then(result => {
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
      .catch(err => {
        console.log(err);
      });
  }, [currentUserId, fetchAgain]);

  const addPostToBookmarkList = async (
    postId: string,
    addPostToBookmarkListName: string,
  ) => {
    console.log(
      `Will add post ${postId} to bmList ${addPostToBookmarkListName} for the user ${currentUserId}`,
    );
    bookmarkService
      .addPostToBookmarkList(currentUserId, postId, addPostToBookmarkListName)
      .then(result => {
        console.log("Res in frontend after adding the bookmark", result);
        setFetchAgain(prev => !prev);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeFromBookmarkList = async (
    postId: string,
    removeFromBookmarkListName: string,
  ) => {
    console.log(
      `Will delete post ${postId} from bmList ${removeFromBookmarkListName} for the user ${currentUserId}`,
    );
    bookmarkService
      .removePostFromBookmarkList(
        currentUserId,
        postId,
        removeFromBookmarkListName,
      )
      .then(result => {
        console.log("Res in frontend after deleting the bookmark", result);
        setFetchAgain(prev => !prev);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    httpClient
      .get("/feeds/feeds/all")
      .then(res => {
        console.log(
          "Before setting the feeds on the bookmark page",
          res.data.message,
        );
        const interimFeeds: any = res.data.message;

        for (let f of interimFeeds) {
          const fId: any = f._id;
          if (bookmarkedPosts[fId]) {
            f.bookmarkListName = bookmarkedPosts[fId];
          }
          f.initials = f.user.firstname.charAt(0) + f.user.lastname.charAt(0);
          f.username = f.user.firstname + " " + f.user.lastname;
          // f.addPostToBookmarkList = addPostToBookmarkList;
          // f.removeFromBookmarkList = removeFromBookmarkList;
          // f.bookmarkListNames = bookmarkListNames;
        }
        setFeeds(interimFeeds);
        console.log("interimFeeds", interimFeeds);
      })
      .catch(err => {
        console.log(err);
      });
  }, [bookmarkedPosts, bookmarkListNames, fetchAgain]);

  // Navigate to that post
  const redirectToBookmarkedPost = (feed: any) => {
    const feedPassed = feeds.filter((f: feedType) => f._id === feed._id);

    console.log("FEPassed", feedPassed[0]);
    feedPassed[0].addPostToBookmarkList = addPostToBookmarkList;
    feedPassed[0].removeFromBookmarkList = removeFromBookmarkList;
    feedPassed[0].bookmarkListNames = bookmarkListNames;

    navigate("/post", {
      state: {
        feed: JSON.parse(JSON.stringify(feedPassed[0])),
      },
    });
  };

  useEffect(() => {
    bookmarkService.getBookmarkListOfUser(currentUserId).then(result => {
      const bmListsRes = result.data;

      console.log("The whole bmList", bmListsRes);
      for (let bmList of bmListsRes) {
        const bmListName = bmList.bookmarkListName;
        const postIds = bmList.postIds;

        for (let postId of postIds) {
          // Fetch the post
          httpClient
            .get(`/posts/getOne/${postId}`)
            .then(res => {
              const bmPost = res.data.post;
              // setting the state
              setBookmarkLists(prevBmList => {
                let added = false;
                const newBmList = prevBmList;
                for (let bmList of newBmList) {
                  if (!!bmList.bmListName && bmList.bmListName === bmListName) {
                    bmList.posts.push(bmPost);
                    added = true;
                    break;
                  }
                }

                if (!added) {
                  newBmList.push({
                    bmListName,
                    posts: [bmPost],
                  });
                }

                //  Remove duplicates
                for (let bmList of newBmList) {
                  bmList.posts = [...new Set(bmList.posts)];
                }

                return [...newBmList];
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    });
  }, [currentUserId, fetchAgain]);

  return (
    <Grid
      container
      sx={{
        bgcolor: "#79dfef",
        color: "#000000",
        padding: "1rem",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {console.log("bmfinall", bookmarkLists)}
      {bookmarkLists.map(bmList => (
        <div style={{ width: "100%" }}>
          <Typography style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }} variant="h5" component="h5">
            Bookmark list: <b>{bmList.bmListName}</b>
          </Typography>
          {bmList.posts.map(post => (
            <Accordion key={post._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography style={{ marginLeft: "0.5rem" }} variant="h6" component="h6">
                  {post.topic}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{cursor: "pointer"}}
              >
                <div style={{display: "flex", "justifyContent": "space-between", "alignItems": "center"}}>
                  <Typography
                    onClick={() => {
                      redirectToBookmarkedPost(post);
                    }}
                    style={{ marginLeft: "0.5rem" }}>
                      {post.body}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      removeFromBookmarkList(post._id, bmList.bmListName);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
          <Divider variant="middle" />
          <br/>
        </div>
      ))}
    </Grid>
  );
};

export default MyBookmarkLists;
