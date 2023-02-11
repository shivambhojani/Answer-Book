import { Stack, TextField } from "@mui/material";
import { Typography, Grid, Button } from "@mui/material";
import React from "react";
import { TagsInput } from "react-tag-input-component";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import "./Post.css";

/*The code has been referenced from: https://mui.com/material-ui/react-modal/*/
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function EditPost() {

  const data:any = useLocation();

  const navigate = useNavigate();

  const handleDeleteCloseOption = () => setDel(false);

  const [del, setDel] = React.useState(false);

  const [tags, setTags] = React.useState<string[]>(data.state.tags);
  const [taginput, setTaginput] = React.useState('');

  const [topic, setTopic] = React.useState<string>(data.state.topic);

  const [body, setBody] = React.useState<string>(data.state.body);
  const [errorsbody, setErrosbody] = React.useState<{ name: string }>();

  const [id, setId] = React.useState<string>(data.state._id);

  const [type, setType] = React.useState(data.state.type);

  

  const postClick = () => {

    setErrosbody({name: ""});

    let errorFlag:number = 0;

    let enteredValue = body || "";
    let trimmedString = typeof enteredValue === "string" ? enteredValue.trim() : "";
    if (trimmedString.length === 0) {
      setErrosbody({ name: "Body cannot be empty" });
      errorFlag = errorFlag + 1;
    }else if (trimmedString.length < 30){
      setErrosbody({ name: "Body should have atleast 30 characters" });
      errorFlag = errorFlag + 1;
    }

    if(errorFlag == 0){
      //setDel(true);
      const postBody = {
        "body": body,
        "tags": tags,
        "type": type,
      }

      console.log(postBody);

      axios.put(`https://csci5709-answerme-backend.herokuapp.com/posts/putPost/`+id, postBody)
        .then(res => {
          console.log(res);
      navigate("/userprofile");
        })
    }
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

  const handleChangeInType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
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
              <Stack spacing={2}>
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
                  disabled
                  id="topic"
                  name="topic"
                  autoFocus
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
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
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet tellus vel cursus luctus. Cras molestie lacus auctor, volutpat felis et, bibendum ipsum. Praesent tincidunt consequat enim et aliquam. Cras tempor orci vel lorem imperdiet, at egestas ipsum tempus. Aenean nec felis tristique, congue sem quis, euismod leo."
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
}

export default EditPost;
