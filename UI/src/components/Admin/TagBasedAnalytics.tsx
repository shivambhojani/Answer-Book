//author - Naga Pavan Srivathsav Chevuru
import React from "react";
import Highcharts from "highcharts/highstock";
import HighChartsReact from "highcharts-react-official";
import OutlinedCard from "./OutlinedCard";
import { Container } from "@mui/system";
import axios from 'axios';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Stack, TextField } from "@mui/material";
import { Typography, Grid, Button } from "@mui/material";
import "./TagBasedAnalytics.css";
import SendIcon from "@mui/icons-material/Send";
import PieChart from "highcharts-react-official";
import { grey } from "@mui/material/colors";

interface T {
  name: string,
  y: number
}
          

const TagBasedAnalytics = () => {

  const [totalPosts, setTotalPosts] = React.useState<string>("0");
  const [postsWithTags, setPostsWithTags] = React.useState<string>("0");

  const [tags, setTags] = React.useState<string[]>([]);
  const [taginput, setTaginput] = React.useState('');

  const [tagsCounter, setTagsCounter] = React.useState<number[]>([]);

  React.useEffect(() => {
    fetchTotalPosts();
  }, []);

  const fetchTotalPosts = ()=> {
    axios.get('https://csci5709-answerme-backend.herokuapp.com/posts/getTotalPosts').then(result => {
    console.log(result.data.posts.length);
    setTotalPosts(result.data.posts.length);
    }).catch(err => {
    console.error(err);
    })
  }

  // Tags
  const deleteTag = async (index:number) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index));
    
    var tagsCopyArr = [...tags];
    tagsCopyArr.splice(index,1);
    console.log(tagsCopyArr);

    var tagsCounterCopy = [...tagsCounter];
    tagsCounterCopy.splice(index,1);
    setTagsCounter(tagsCounterCopy);


    if(tagsCopyArr.length ==0 ){
      setPostsWithTags("0");
    }else{
      await axios.get(`https://csci5709-answerme-backend.herokuapp.com/posts/getPostsByTags/`+ tagsCopyArr)
      .then(res => {
        console.log(res.data.posts.length);
        setPostsWithTags(res.data.posts.length);
      })
    }
  }

  const onTagsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setTaginput(value);
  };
  
  const onTagsKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const editedInput = taginput.trim();
    const { key } = event;

    if (editedInput.length && (key === ',' || key === 'Enter') && !tags.includes(editedInput)) {
      event.preventDefault();
      await setTags(prevState => [...prevState, editedInput]);
      setTaginput('');

      var tagsCopyArr = [...tags];
      tagsCopyArr.push(editedInput);
      console.log(tagsCopyArr);

      await axios.get(`https://csci5709-answerme-backend.herokuapp.com/posts/getPostsByTags/`+ tagsCopyArr )
      .then(res => {
        console.log(res.data.posts.length);
        setPostsWithTags(res.data.posts.length);
        var counter = [];
        for(let i=0; i<tagsCopyArr.length;i++){
          let count = 0;
          for(let j=0;j<res.data.posts.length;j++){
            if(res.data.posts[j].tags.includes(tagsCopyArr.at(i))){
              count = count +1;
            }
          }
          counter.push(count);
          
        }
        setTagsCounter(counter);
      })
    }

  };

  
    return (
      <>
      <div className="maindiv">
        <div className="elements">
          <div className="searchbox">
          <TextField
              value={taginput}
              placeholder="Enter tags here for analytics"
              onKeyDown={onTagsKeyDown}
              onChange={onTagsInputChange}
              fullWidth
              helperText="Enter tags here for analytics"
              />
          </div>
          <div className="tag-container">
          {tags.map((tag, index) => (
            <div className="tag">
              <p className="tag-body">{tag}</p>
                <button onClick={() => deleteTag(index)}><ClearOutlinedIcon fontSize="small"/></button>
              </div>
              ))}
            </div>
        </div>
      </div>
      
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} md={3} >
          <div style={{ textAlign: "center" }}>
            <OutlinedCard title="Posts with Tags" body= {postsWithTags}></OutlinedCard>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div style={{ textAlign: "center" }}>
            <OutlinedCard title="Total Posts" body= {totalPosts}></OutlinedCard>
          </div>
        </Grid>
      </Grid>
      <div className="table-users">
            <table cellSpacing="0" id="myTable">
              <tbody>
                {tags?.length
                  ? tags.map((tag, index) => {
                      console.log(tags.length);
                      return (
                        <tr key={index}>
                          <td>{tags.at(index)}</td>
                          <td>{tagsCounter.at(index)}</td>
                        </tr>
                      );
                    })
                  : null};
              </tbody>
            </table>
          </div>
    </>
    );
  }

export default TagBasedAnalytics;
