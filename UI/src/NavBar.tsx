import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { failedAuth, gotAuth } from "./store/reducers/authentication";

import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Autocomplete,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import Card from "@mui/material/Card";

import NotificationsIcon from "@mui/icons-material/Notifications";
import useStyles from "./Style";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import httpClient from "./thunk/interceptor";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

import Modal from "@mui/material/Modal";
import { display } from "@mui/system";
const style = {
  position: "absolute" as "absolute",
  top: "15%",
  right: "2%",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const options = [
  {
    groupBy: "User",
    search: "Shivangi Bhatt",
  },
  {
    groupBy: "User",
    search: "Shivam Bhojani",
  },
  {
    groupBy: "User",
    search: "Aman Bhandari",
  },
  {
    groupBy: "Post",
    search: "Lorem ipsum 1 dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    groupBy: "Post",
    search: "Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    groupBy: "Post",
    search: "Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit. ",
  },
];
{
  /* Referred from https://mui.com/material-ui/react-autocomplete/#grouped */
}

const NavBar = () => {
  const loggedInUserEmailId = localStorage.getItem("userID");
  console.log("email", loggedInUserEmailId);

  const [imagedata, setimagedata] = React.useState<string>();
  const [invisible, setInvisible] = React.useState(false);
  const [notification, setNotification] = React.useState(true);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<{
    groupBy: any;
    search: any;
  }>();

  const handleOpen = () => {
    setOpen(true);
    setInvisible(true);
  };
  const handleClose = () => setOpen(false);
  function avatarclick() {
    navigate("/userprofile");
  }
  function searchclick() {
    navigate("/search");
  }
  function createPostClick() {
    navigate("/createPost");
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button color="inherit" onClick={createPostClick}>
          {" "}
          <AddIcon />
          Create Post
        </Button>
      </MenuItem>
      <MenuItem>
        <Button onClick={handleOpen} color="inherit">
          <NotificationsIcon className={classes.menus} /> Notifications
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <CardHeader
            avatar={
              <Avatar
                alt="Tony Stark"
                src={imagedata}
                sx={{ width: 30, height: 30 }}
              />
            }
          />
          {/* <Avatar
            alt="Remy Sharp"
            src={imagedata}
            sx={{ width: 30, height: 30 }}
            onClick={avatarclick}
          /> */}
        </Button>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    httpClient
      .get("/userprofile/getprofileImage?email=" + loggedInUserEmailId)
      .then((res) => {
        setimagedata(
          res.data.userImage != null
            ? res.data.userImage.image
            : "./assets/defaultProfile.jpg"
        );
        console.log("Image Set-=-=-=-=-=-=", res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (searchValue && searchValue.groupBy) {
      if (searchValue.groupBy == "User") {
        navigate("/openprofile");
      } else {
        navigate("/post", {
          state: {
            feed: {
              initials: "SB",
              username: "Shivangi Bhatt",
              date: "Februrary 28, 2022",
              image: "./assets/Post.png",
              question:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet tellus vel cursus luctus. Cras molestie lacus auctor, volutpat felis et, bibendum ipsum. Praesent tincidunt consequat enim et aliquam. Cras tempor orci vel lorem imperdiet, at egestas ipsum tempus. Aenean nec felis tristique, congue sem quis, euismod leo.",
              tags: ["Tag1", "Tag2", "Tag3"],
              type: "Social",
              shortQuestion:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
            },
          },
        });
      }
    }
  }, [searchValue]);

  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <a href="/feeds" className={classes.link}>
          <Typography
            m={2}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            AnswerBook
          </Typography>
        </a>
        {/* Referred from https://mui.com/material-ui/react-autocomplete/#grouped */}
        {/* <Autocomplete
          id="free-solo-2-demo"
          disableClearable
          value={searchValue}
          onChange={(event: any, newValue: any) => {
            setSearchValue(newValue);
            console.log("newValue=-==-", newValue);
          }}
          options={options}
          groupBy={(option) => option.groupBy}
          getOptionLabel={(option) => option.search}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              sx={{ border: "solid white 1px", borderRadius: "4px" }}
              className={classes.searchBox}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                ),
                type: "search",

                className: classes.searchInput,
              }}
            />
          )}
        /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" onClick={searchclick}>
            {" "}
            <SearchIcon />
            Search
          </Button>

          <Button color="inherit" onClick={createPostClick}>
            {" "}
            <AddIcon />
            Create Post
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userID");
              dispatch(gotAuth({ message: "", token: "" }));
              navigate("/login");
            }}
          >
            {" "}
            <LogoutIcon />
            Logout
          </Button>

          <IconButton onClick={handleOpen} color="inherit">
            <Badge color="secondary" variant="dot" invisible={invisible}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Avatar
              alt="Remy Sharp"
              src={imagedata}
              sx={{ width: 50, height: 50, backgroundColor: "white" }}
              onClick={avatarclick}
            ></Avatar>
          </IconButton>
        </Box>
        {/* Referred from https://mui.com/material-ui/react-app-bar/#app-bar-with-a-primary-search-field */}
        <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "30px" }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>{" "}
          {renderMobileMenu}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={style}>
              <Card sx={{ minWidth: 275 }}>
                <div className="div">
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setNotification(false);
                        }}
                        aria-label="settings"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    subheader="you have created a post"
                  />
                </div>
              </Card>

              <Card sx={{ minWidth: 275 }} style={{ marginTop: "20px" }}>
                <div className="div">
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setNotification(false);
                        }}
                        aria-label="settings"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    subheader="you have edited a post"
                  />
                </div>
              </Card>
            </Box>
          </>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
