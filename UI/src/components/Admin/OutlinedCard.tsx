//author - Aman Singh BHandari

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface card {
  title: string;
  body: string;
}

export default function OutlinedCard(props: card) {
  return (
    <Box sx={{ maxWidth: 200, maxHeight: 200 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.title}
            </Typography>
            <Typography variant="h4" component="div">
              {props.body}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
