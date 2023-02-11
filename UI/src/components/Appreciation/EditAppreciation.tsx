//author - Aman Singh BHandari
import React from "react";
import TextField from "@mui/material/TextField";
import "./EditAppreciation.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { ReactElement } from "react";
import { useState } from "react";

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

function EditAppreciation() {
  [bestAnswerPoints, setBestAnswerPoints] = React.useState(false);
  [commentPoints, setCommentPoints] = useState("");
  [likePoints, setLikePoints] = useState("");
  [postPoints, setPostPoints] = useState("");
  [editMode, setEditMode] = useState("YES");

  return (
    <Box className="Box">
      <h2 className="InputLabel">Appreciation Management</h2>
      <BodyContent />
    </Box>
  );
}

const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
  // Preventing the page from reloading
  event.preventDefault();
  setEditMode("NO");
};

const BodyContent: React.FC = (): ReactElement => {
  if (editMode === "NO") {
    return (
      <div>
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
        </Stack>

        <Button
          variant="contained"
          className="button-save"
          onClick={() => {
            setEditMode("YES");
          }}
        >
          Edit
        </Button>
      </div>
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
      </Stack>

      <Button type="submit" variant="contained" className="button-save">
        Submit
      </Button>
    </form>
  );
};

export default EditAppreciation;
