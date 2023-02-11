//author - Aman Singh BHandari
import React from "react";
import Highcharts from "highcharts/highstock";
import HighChartsReact from "highcharts-react-official";
import OutlinedCard from "./OutlinedCard";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

const options = {
  //dashboard values
  chart: {
    type: "spline",
    height: "300px",
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["May", "June", "July"],
    crosshair: true,
  },
  series: [
    {
      data: [1, 3, 12],
      name: "Total Posts",
    },
    {
      data: [0, 2, 6],
      name: "Answered Posts",
      color: "orange",
    },
  ],
};

export default class AdminDashboard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Container>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "220px",
            flexWrap: "wrap",
            flexBasis: "33%",
          }}
        > */}
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <div style={{ textAlign: "center" }}>
              <OutlinedCard title="Total Posts" body="16"></OutlinedCard>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div style={{ textAlign: "center" }}>
              <OutlinedCard title="Total Users" body="8"></OutlinedCard>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div style={{ textAlign: "center" }}>
              <OutlinedCard
                title="Total Posts Answered"
                body="6"
              ></OutlinedCard>
            </div>
          </Grid>
        </Grid>
        {/* </div> */}

        <div style={{ marginTop: "20px" }}>
          <HighChartsReact highcharts={Highcharts} options={options} />
        </div>
      </Container>
    );
  }
}
