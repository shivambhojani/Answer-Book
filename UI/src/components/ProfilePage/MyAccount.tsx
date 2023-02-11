import * as React from "react";
import { Box, Grid, Tabs,Typography,Card, CardContent } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfilePage from "./ProfilePage";
import "./MyAccount.css";
import MyFriends from "./MyFriends";
import AnalyticsAppreciation from "../Appreciation/AnalyticsAppreciation";
import { Container } from "@mui/system";
import MyPosts from "./MyPosts";
import MyBookmarkLists from "../BookmarksList/MyBookmarkLists";
import axios from 'axios';
import UtilityUser from "../Utility/UtilityUser";
import ResetPasswprd from "./ResetPassword";

export default function MyAccount() {
  const [value, setValue] = React.useState("1");
  
  const [posts, setPosts] = React.useState([]);
  
  const [userId, setUserId] = React.useState();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetchPosts();
  },[])

  const fetchPosts = ():void => {
     UtilityUser().then(function (response) {
      setUserId(response.user._id);
      console.log('User Id------>',userId);
      axios.get('https://csci5709-answerme-backend.herokuapp.com/posts/'+response.user._id).then(result => {
      console.log(result.data.posts);
      setPosts(result.data.posts);
      }).catch(err => {
      console.error(err);
    })
    });
  }
  
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div className="Tabs">
            <Tabs
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              centered
              sx={{ width: "100%" }}
              scrollButtons="auto"
            >
              <Tab label="Profile Settings" value="1" />
              <Tab label="My Posts" value="2" />
              <Tab label="Subscribed Users" value="3" />
              <Tab label="My Reputation" value="4" />
              <Tab label="My Bookmark lists" value="5" />
              <Tab label="Reset Password" value="6" />
            </Tabs>
          </div>
        </Box>
        <TabPanel value="1">
          <ProfilePage></ProfilePage>
        </TabPanel>
        <TabPanel value="2">
          <Container>
            <Grid container spacing={2}>
              {posts.length > 0 ? (
				  posts.map((post: any) => <MyPosts {...post}/>)
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
            </Grid>{" "}
          </Container>
        </TabPanel>
        <TabPanel value="3">
          <MyFriends></MyFriends>
        </TabPanel>
        <TabPanel value="4">
          <AnalyticsAppreciation />
        </TabPanel>
        <TabPanel value="5">
          <MyBookmarkLists />
        </TabPanel>
        <TabPanel value="6">
          <ResetPasswprd />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
