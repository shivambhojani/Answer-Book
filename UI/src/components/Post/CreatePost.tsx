import { Stack, TextField } from "@mui/material";
import { Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import UtilityUser from "../Utility/UtilityUser";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import "./Post.css";

const CreatePost = () => {
  const navigate = useNavigate();

  const [tags, setTags] = React.useState<string[]>([]);
  const [taginput, setTaginput] = React.useState('');

  const [topic, setTopic] = React.useState<string>();
  const [errorstopic, setErrostopic] = React.useState<{ name: string }>();

  const [body, setBody] = React.useState<string>();
  const [errorsbody, setErrosbody] = React.useState<{ name: string }>();

  const [type, setType] = React.useState('');
  const [errorstype, setErrostype] = React.useState<{ name: string }>();

  const [userId, setUserId] = useState();

  useEffect(() => {
    UtilityUser().then(function (response) {
      setUserId(response.user._id);
      console.log('User Id------>',userId);
    });
  }, []);

  const handleChangeInType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const postClick = () => {

    
    setErrostopic({name: ""});
    setErrosbody({name: ""});
    setErrostype({name: ""});

    let errorFlag:number = 0;

    let enteredValue = topic || "";
    let trimmedString = typeof enteredValue === "string" ? enteredValue.trim() : "";
    if (trimmedString.length === 0) {
      setErrostopic({ name: "Topic cannot be empty" });
      errorFlag = errorFlag + 1;
    }else if (trimmedString.length < 15){
      setErrostopic({ name: "Topic should have atleast 15 characters" });
      errorFlag = errorFlag + 1;
    }

    enteredValue = body || "";
    trimmedString = typeof enteredValue === "string" ? enteredValue.trim() : "";
    if (trimmedString.length === 0) {
      setErrosbody({ name: "Body cannot be empty" });
      errorFlag = errorFlag + 1;
    }else if (trimmedString.length < 30){
      setErrosbody({ name: "Body should have atleast 30 characters" });
      errorFlag = errorFlag + 1;
    }

    enteredValue = type || "";
    trimmedString = typeof enteredValue === "string" ? enteredValue.trim() : "";
    if (trimmedString.length === 0) {
      setErrostype({ name: "Type cannot be empty" });
      errorFlag = errorFlag + 1;
    }

    if (errorFlag === 0) {
      const postBody = {
        "userId": userId ,
        "topic": topic,
        "body": body,
        "tags": tags,
        "type": type,
        "reactions":[],
        "__v": 0
      }

      console.log(postBody);

      axios.post(`https://csci5709-answerme-backend.herokuapp.com/posts/savePost`, postBody)
        .then(res => {
          console.log(res);
        })

      navigate("/feeds");
    }

  };

  const discardClick = () => {
    navigate("/feeds");
  };

  const handleChangeInBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setBody(value);
  };

  const handleChangeInTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setTopic(value);
  };

  // Tags
  const deleteTag = (index:Number) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }

  const onTagsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setTaginput(value);
  };
  
  const onTagsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const editedInput = taginput.trim();
    const { key } = event;

    if (!taginput.length && key === "Backspace" && tags.length > 0) {
      event.preventDefault();
      const tagsCopy = [...tags]; // shallow copy
      const deletedTag: string = tagsCopy.pop()!;

      setTags(tagsCopy);
      setTaginput(deletedTag);
    }
  
    if (editedInput.length && (key === ',' || key === 'Enter') && !tags.includes(editedInput)) {
      event.preventDefault();
      setTags(prevState => [...prevState, editedInput]);
      setTaginput('');
    }

  };

  return (
      <Grid  item xs={12} md={7} spacing={4} alignItems="center" justifyContent="center">
        <Stack
          direction="column"
          spacing={3}
          justifyContent="flex-start"
          alignItems="left"
          className="grid-container"
        >
          <Stack 
          direction="column"
          spacing={3}
          sx={{ paddingTop: "1%" }}
          justifyContent="flex-start"
          alignItems="left" 
          className="grid-container-child">
          <Stack spacing={2} >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Topic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Be specific about the topic of your post.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              value={topic}
              onChange={handleChangeInTopic}
              id="topic"
              placeholder="e.g. what are wireframes?"
              name="topic"
              autoFocus
              error={Boolean(errorstopic?.name)}
              helperText={errorstopic?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Body
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              value={body}
              onChange={handleChangeInBody}
              multiline
              rows={6}
              id="body"
              error={Boolean(errorsbody?.name)}
              helperText={errorsbody?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Tags
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add tags to explain what your post is
            </Typography>
            <TextField
              value={taginput}
              placeholder="Enter a tag"
              onKeyDown={onTagsKeyDown}
              onChange={onTagsInputChange}
              />
            <div className="tag-container">
            {tags.map((tag, index) => (
                  <div className="tag">
                    <p className="tag-body">{tag}</p>
                    <button onClick={() => deleteTag(index)}><ClearOutlinedIcon fontSize="small"/></button>
                  </div>
              ))}
            </div>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Type of Post
            </Typography>
              <Select
                id="select-input-id"
                value={type}
                label="Type"
                onChange={handleChangeInType}
                error={Boolean(errorstype?.name)}
              >
                <MenuItem value={'Social'}>Social</MenuItem>
                <MenuItem value={'Technical'}>Technical</MenuItem>
              </Select>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => postClick()}
            >
              Post
            </Button>
            <Button
              href="#discard-button"
              fullWidth
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={discardClick}
            >
              Discard
            </Button>
          </Stack>
          </Stack>
        </Stack>
      </Grid>
  );
};

export default CreatePost;
