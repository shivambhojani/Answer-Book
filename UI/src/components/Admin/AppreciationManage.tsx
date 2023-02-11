//author - Aman Singh BHandari
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./AppreciationManage.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { ReactElement } from "react";
import { useState } from "react";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";

let bestAnswerPoints: any; //Hook to store points
let setBestAnswerPoints: any; //Hook to store points
let commentPoints: any; //Hook to store points
let setCommentPoints: any; //Hook to store points
let likePoints: any; //Hook to store points
let setLikePoints: any; //Hook to store points
let postPoints: any; //Hook to store points
let setPostPoints: any; //Hook to store points

let editMode: any; //if the page is in editable mode
let setEditMode: any; //change the value once the page changes the mode

function AppreciationManage() {
  [bestAnswerPoints, setBestAnswerPoints] = React.useState(false); //scores for best answer
  [commentPoints, setCommentPoints] = useState(""); //score for comment
  [likePoints, setLikePoints] = useState(""); //score to add like
  [postPoints, setPostPoints] = useState(""); //score to add post
  [editMode, setEditMode] = useState("NO"); //decide to show edit mode or not

  useEffect(() => {
    // UtilityUser().then(function (response) {
    //   console.log("user details::" + response.user.firstname);
    // });

    httpClient.get("/offerscore").then(function (response) {
      setCommentPoints(response.data.score_offered.commentsScore);
      setLikePoints(response.data.score_offered.likesScore);
      setBestAnswerPoints(response.data.score_offered.bestAnswerScore);
      setPostPoints(response.data.score_offered.postsScore);
    });
  }, []);

  return (
    <Box className="Box">
      <BodyContent />
    </Box>
  );
}

const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
  // Preventing the page from reloading
  event.preventDefault();
  setEditMode("NO");
  const body = {
    likesScore: likePoints,
    commentsScore: commentPoints,
    bestAnswerScore: bestAnswerPoints,
    postsScore: postPoints,
  };
  httpClient.put("/offerscore", body).then(function (response) {});
};

const BodyContent: React.FC = (): ReactElement => {
  if (editMode === "NO") {
    return (
      <Stack spacing={4} className="TextFields">
        <div className="DivText">
          <label>Points for Best Answer</label>
          <h2 className="ValueLabel">{bestAnswerPoints}</h2>
        </div>
        <div className="DivText">
          <label>Points for Commenting</label>
          <h2 className="ValueLabel">{commentPoints}</h2>
        </div>
        <div className="DivText">
          <label>Points for Liking Posts</label>
          <h2 className="ValueLabel">{likePoints}</h2>
        </div>
        <div>
          <label>Points for Adding Posts</label>
          <h2 className="ValueLabel">{postPoints}</h2>
        </div>
        <Button
          variant="contained"
          className="button-save"
          onClick={() => {
            setEditMode("YES");
          }}
        >
          Edit
        </Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={submitForm}>
      <Stack spacing={8} className="TextFields">
        <TextField
          required
          label="Points for Best Answer"
          color="primary"
          type="number"
          onChange={(e) => setBestAnswerPoints(e.target.value)}
        />
        <TextField
          required
          label="Points for Commenting"
          color="primary"
          type="number"
          onChange={(e) => setCommentPoints(e.target.value)}
        />
        <TextField
          required
          label="Points for Liking Posts"
          color="primary"
          type="number"
          onChange={(e) => setLikePoints(e.target.value)}
        />
        <TextField
          required
          label="Points for Adding Posts"
          color="primary"
          type="number"
          onChange={(e) => setPostPoints(e.target.value)}
        />
        <Button type="submit" variant="contained" className="button-save">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default AppreciationManage;
