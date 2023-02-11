//author - Aman Singh BHandari
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import "./Comment.css";
import { Typography, Button } from "@mui/material";
import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";
import { getThemeProps } from "@mui/system";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";
import moment from "moment";

interface comment {
  avatar: string;
  author: string;
  date: Date;
  content: string;
  isBestAnswer: boolean;
  _id: string;
  userId: string;
  postOwner: string;
}

export default function Comment(props: comment) {
  const [attributes, setAttributes] = useState<comment>(props);
  const [hidden, setHidden] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    UtilityUser().then((response) => {
      console.log("comment => current user id ::" + response.user._id);
      setCurrentUser(response.user._id);
    });
  }, []);

  const canMarkAnswer = () => {
    console.log("canMarkAnswer::" + currentUser + " " + attributes.postOwner);
    if (currentUser === attributes.postOwner) {
      return false;
    }

    return true;
  };

  const canDelete = () => {
    console.log("canDelete::" + currentUser + " " + attributes.postOwner);
    if (currentUser === attributes.userId) {
      return false;
    }

    return true;
  };

  return (
    <Card className="card" hidden={hidden}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {attributes.avatar}
          </Avatar>
        }
        title={attributes.author}
        subheader={moment(attributes.date).format("MMM Do YYYY")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {attributes.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {attributes.isBestAnswer ? (
          <IconButton aria-label="add to favorites">
            <DownloadDoneRoundedIcon
              style={{ color: "green" }}
              fontSize="large"
            />
          </IconButton>
        ) : null}
        <div hidden={canMarkAnswer()}>
          <Button
            onClick={() => {
              httpClient
                .put("/comment", {
                  _id: attributes._id,
                  userId: attributes.userId,
                  isBestAnswer: !attributes.isBestAnswer,
                })
                .then((response) => {
                  var attr = JSON.parse(JSON.stringify(attributes));
                  attr.isBestAnswer = !attr.isBestAnswer;
                  setAttributes(attr);
                });
            }}
          >
            {attributes.isBestAnswer
              ? "Unmark as correct answer"
              : "Mark as correct answer"}
          </Button>
        </div>
        <div hidden={canDelete()}>
          <Button
            onClick={() => {
              httpClient
                .delete("/comment/" + attributes._id)
                .then((response) => {
                  setHidden(true);
                });
            }}
          >
            Delete
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
