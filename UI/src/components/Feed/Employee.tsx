import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useStyles from "./Style";
import { useEffect, useState } from "react";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";

/*
 * @author: Shivangi Bhatt
 *
 */
export default function Employee(props: any) {
  const classes = useStyles();
  const [subscribed, setSubscribed] = useState(false);
  const [userId, setUserId] = useState();
  console.log("props", props);

  // get user Id and subscribe user tof the logged in user
  useEffect(() => {
    UtilityUser().then(function (response) {
      setUserId(response.user._id);
      setSubscribed(response.user.subscribedTo.includes(props.user._id));
    });
  }, []);

  console.log("subscribed", subscribed);
  const handleSubscribe = () => {
    if (!subscribed) {
      subscribe();
    } else {
      unSubscribe();
    }
  };

  const subscribe = () => {
    httpClient
      .post("/subscribeUser", {
        loggedInUserId: userId,
        SubscribeToUserId: props.user._id,
      })
      .then((res) => {
        setSubscribed(true);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unSubscribe = () => {
    httpClient
      .post("/unSubscribeUser", {
        loggedInUserId: userId,
        SubscribeToUserId: props.user._id,
      })
      .then((res) => {
        setSubscribed(false);

        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    // The below code is referred from https://mui.com/material-ui/react-card/#complex-interaction
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="140"
        image={
          props.images ? props.images.image : "./assets/defaultProfile.jpg"
        }
        style={{ maxHeight: "250px" }}
        alt="green iguana"
      />
      <CardContent>
        <div className={classes.flex}>
          <Typography variant="h5" component="div">
            {props.user.firstname + " " + props.user.lastname}
          </Typography>
          <Button onClick={handleSubscribe}>
            {!subscribed ? "Subscribe" : "Unsubscribe"}
          </Button>
        </div>
        <Typography variant="body2" color="text.secondary">
          {props.info}
        </Typography>
        <div className={classes.lastRow}>
          <div>Score: {props.totalScore}</div>
          <div>Badge: {props.badge}</div>
        </div>
      </CardContent>
    </Card>
  );
}
