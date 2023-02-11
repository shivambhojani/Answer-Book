import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Chip, Avatar, IconButton, Grid, Button, Popover } from "@mui/material";
import useStyles from "./Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea, Menu, MenuItem } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkSelector from "../BookmarkSelector/BookmarkSelector";
import { FacebookSelector, FacebookCounter } from "@charkour/react-reactions";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";

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
  filter: any;
  setFilter: any;
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
/*
 * @author: Shivangi Bhatt
 *
 */
function Feed(props: feed) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [emojiSelector, setEmojiSelector] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");
  const [update, setupdate] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [feed, setFeed] = useState({
    _id: props._id,
    initials: props.user.firstname.charAt(0) + props.user.lastname.charAt(0),
    username: props.user.firstname + " " + props.user.lastname,
    createdOn: props.createdOn,
    body: props.body,
    topic: props.topic,
    tags: props.tags,
    type: props.type,
    image: props.image,
    user: props.user,
    filter: props.filter,
    setFilter: props.setFilter,
    reactions: props.reactions,
    bookmarkListName: props.bookmarkListName,
    addPostToBookmarkList: props.addPostToBookmarkList,
    removeFromBookmarkList: props.removeFromBookmarkList,
    bookmarkListNames: props.bookmarkListNames,
  });
  {
    /* Below code was referenced from https://mui.com/material-ui/react-menu/#customization */
  }

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorElement);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  useEffect(() => {
    UtilityUser().then(function (response) {
      setUserId(response.user._id);
      setSubscribed(response.user.subscribedTo.includes(props.user._id));
      setUserName(response.user.firstname + " " + response.user.lastname);
    });
    getReactions();
  }, []);

  const getReactions = () => {
    httpClient
      .get("/posts/getOne/" + props._id)
      .then((res) => {
        setReactions(res.data.post.reactions);
        // setupdate(true);
        // props.setFilter(props.filter);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseMenu = () => {
    setAnchorElement(null);
  };
  const redirectToPost = () => {
    navigate("/post", {
      state: {
        feed: JSON.parse(JSON.stringify(feed)),
      },
    });
  };
  // add reaction

  const callbackend = (select: any) => {
    httpClient
      .post("/feeds/addReactions/" + props._id, {
        reaction: select,
        userId: userId,
        userName: userName,
      })
      .then((res) => {
        console.log(res.data.message);
        getReactions();
        // setupdate(true);
        // props.setFilter(props.filter);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTimeout(() => setupdate(false), 50000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubscribe = () => {
    if (!subscribed) {
      subscribe();
    } else {
      unSubscribe();
    }
  };

  const subscribe = () => {
    httpClient
      .post("/subscribeUser", {
        loggedInUserId: userId,
        SubscribeToUserId: props.user._id,
      })
      .then((res) => {
        setSubscribed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unSubscribe = () => {
    httpClient
      .post("/unSubscribeUser", {
        loggedInUserId: userId,
        SubscribeToUserId: props.user._id,
      })
      .then((res) => {
        setSubscribed(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // The below code is referred from https://mui.com/material-ui/react-card/#complex-interaction
    <>
      <br />
      <Card>
        {console.log("Props that I got", props)};
        <CardContent>
          <div className={classes.flex}>
            <div className={classes.tags}>
              <Avatar className={classes.avatar}>
                {props.user.firstname.charAt(0).toUpperCase() +
                  props.user.lastname.charAt(0).toUpperCase()}
              </Avatar>

              <div>
                <Typography variant="h5" component="div">
                  {props.user.firstname + " " + props.user.lastname}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {moment(props.createdOn).format("MMM Do YYYY")}
                </Typography>
              </div>

              <Chip
                label={props.type}
                className={
                  props.type.toLowerCase() == "social"
                    ? classes.social
                    : classes.technical
                }
              />
            </div>
            <IconButton onClick={handleOpenMenu}>
              {" "}
              <MoreVertIcon className={classes.moreIcon} />
            </IconButton>
            {/* Below code was referenced from https://mui.com/material-ui/react-menu/#customization */}
            <Menu
              anchorEl={anchorElement}
              open={open}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleSubscribe}>
                {!subscribed ? "Subscribe" : "Unsubscribe"}
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>Report</MenuItem>
            </Menu>
          </div>
          <CardActionArea onClick={redirectToPost}>
            <Typography gutterBottom variant="h5">
              {props.topic}
            </Typography>
            <Typography gutterBottom variant="body2">
              {props.body}
            </Typography>
            {props.image ? (
              <img src={props.image} style={{ height: "200px" }} />
            ) : null}
          </CardActionArea>

          <div className={classes.lastRow}>
            <Grid container spacing={2} className={classes.lastRow}>
              <Grid item md={4} xs={12}>
                <div className={classes.tags}>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <FacebookSelector
                      iconSize={20}
                      onSelect={(select) => {
                        console.log(select);
                        callbackend(select);
                        // toast.info("🦄 Cool reaction!", {
                        //   position: "top-right",
                        //   autoClose: 1000,
                        //   hideProgressBar: false,
                        //   closeOnClick: true,
                        //   pauseOnHover: true,
                        //   draggable: true,
                        //   progress: undefined,
                        // });
                      }}
                    />{" "}
                  </Popover>

                  <Button
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                    }}
                    // style={{ float: "right" }}
                  >
                    <FacebookCounter
                      counters={reactions}
                      alwaysShowOthers={true}
                      user={userName}
                    />
                  </Button>
                </div>
              </Grid>

              <Grid item md={4} xs={12}>
                <div className={classes.tags}>
                  {props.bookmarkListName ? (
                    <Chip
                      label={`Bookmarked in ${props.bookmarkListName}`}
                      variant="outlined"
                      onDelete={() => {
                        props.removeFromBookmarkList(
                          props._id,
                          props.bookmarkListName
                        );
                      }}
                    />
                  ) : (
                    <BookmarkSelector
                      postId={feed._id}
                      addPostToBookmarkList={props.addPostToBookmarkList}
                      bookmarkListNames={props.bookmarkListNames}
                    />
                  )}
                </div>
              </Grid>
              {props.tags.length > 0 ? (
                <Grid item md={4} xs={12}>
                  <div className={classes.tags}>
                    {" "}
                    {props.tags.map((tag) => (
                      <Chip label={tag} className={classes.tag} />
                    ))}
                  </div>
                </Grid>
              ) : null}
            </Grid>
          </div>
        </CardContent>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Card>
    </>
  );
}

export default Feed;
