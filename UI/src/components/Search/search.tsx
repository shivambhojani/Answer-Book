import * as React from "react";
import { Box, Grid, Tabs, Typography, Card, CardContent } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "./search.css";

import axios from 'axios';
import UtilityUser from "../Utility/UtilityUser";
import SearchUsers from "./searchusers";
import SearchPosts from "./searchposts";


export default function MyAccount() {
    const [value, setValue] = React.useState("1");

    const [posts, setPosts] = React.useState([]);

    const [userId, setUserId] = React.useState();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = (): void => {
        UtilityUser().then(function (response) {
            setUserId(response.user._id);
            console.log('User Id------>', userId);
            axios.get('https://csci5709-answerme-backend.herokuapp.com/posts/' + response.user._id).then(result => {
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
                            <Tab label="Search Posts" value="1" />
                            <Tab label="Search Users" value="2" />
                         
                        </Tabs>
                    </div>
                </Box>
                <TabPanel value="1">
                    <SearchPosts></SearchPosts>
                </TabPanel>
                <TabPanel value="2">
                <SearchUsers></SearchUsers> 
                </TabPanel>
            </TabContext>
        </Box>
    );
}
