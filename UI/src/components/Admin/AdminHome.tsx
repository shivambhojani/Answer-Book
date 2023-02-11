//author - Aman Singh BHandari

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./AdminHome.css";
import AdminDashboard from "./AdminDashboard";
import AppreciationManage from "./AppreciationManage";
import ProfileListing from "./ProfileListing";
import TagBasedAnalytics from "./TagBasedAnalytics";

export default function AdminHome() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div className="Tabs">
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Dashboard" value="1" />
              <Tab label="Edit Appreciation" value="2" />
              <Tab label="Manage Users" value="3" />
			  <Tab label="Tag Based Analytics" value="4" />
            </TabList>
          </div>
        </Box>
        <TabPanel value="1">
          <AdminDashboard></AdminDashboard>
        </TabPanel>
        <TabPanel value="2">
          <AppreciationManage />
        </TabPanel>
        <TabPanel value="3">
          <ProfileListing />
        </TabPanel>
		<TabPanel value="4">
		  <TagBasedAnalytics></TagBasedAnalytics>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
