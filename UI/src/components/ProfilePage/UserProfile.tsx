import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./UserProfile.css";
import httpClient from "../../thunk/interceptor";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UserProfile = () => {

  let { userid } = useParams();

  const [expanded, setExpanded] = React.useState(false);

  const [firstname, setfirstname] = React.useState<string>();
  const [lastname, setlastname] = React.useState<string>();
  const [email, setemail] = React.useState<String>();
  const [imagedata, setimagedata] = React.useState<string>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  interface userData {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    title: string;
    picture: string;
  }

  let { emailid } = useParams();

  useEffect(() => {
    console.log("UserPRofile", emailid)
    httpClient.get("/userprofile/currentuser?email=" + emailid)
      .then((res) => {
        console.log(res.data);
        setfirstname(res.data.user.firstname);
        setlastname(res.data.user.lastname);
        setemail(res.data.user.email);

        httpClient.get("/userprofile/getprofileImage?email=" + emailid)
          .then((res) => {
            console.log(res);
            setimagedata(res.data.userImage.image)

          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
    }, 5000);
  }, []);

  return (
    <>
      <div className="maindiv">
        {/* <div className="carddiv"> */}
        <Card>
          <div className="divAvatar">
            <CardHeader
              avatar={
                <Avatar
                  alt="Tony Stark"
                  src={imagedata}
                  sx={{ width: 200, height: 200 }}
                />
              }
            />
          </div>
          <div className="subscribebutton">
            <Button variant="contained">Subscribe</Button>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {firstname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </CardContent>
        </Card>
        {/* </div> */}
      </div>
    </>
  );
};

export default UserProfile;
