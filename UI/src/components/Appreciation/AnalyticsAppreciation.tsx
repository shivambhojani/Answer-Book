//author - Aman Singh BHandari
import React from "react";
import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import UtilityUser from "../Utility/UtilityUser";
import httpClient from "../../thunk/interceptor";

export default class AnalyticsAppreciation extends React.Component {
  componentWillMount = () => {
    console.log("calling setoption in componentn did mount");
    this.setOptions();
    console.log("finished setoption in componentn did mount");
  };

  state = {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Reputation Earned: ",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Earned from Comments",
              y: 1,
              sliced: true,
              selected: true,
            },
            {
              name: "Earned from Likes",
              y: 1,
            },
            {
              name: "Earned from Posts",
              y: 1,
            },
            {
              name: "Earned from Best Answer",
              y: 99,
            },
          ],
        },
      ],
    },
  };

  constructor(props: any) {
    super(props);
  }

  setOptions() {
    var options = this.state.options;

    UtilityUser().then((response) => {
      httpClient.get("/appreciation/" + response.user._id).then((response) => {
        options.series[0].data[0].y = response.data.appreciation.commentsScore;
        options.series[0].data[1].y = response.data.appreciation.likesScore;
        options.series[0].data[2].y = response.data.appreciation.postsScore;
        options.series[0].data[3].y =
          response.data.appreciation.bestAnswerScore;
        options.title.text +=
          options.series[0].data[0].y +
          options.series[0].data[1].y +
          options.series[0].data[2].y +
          options.series[0].data[3].y;

        this.setState({
          options: options,
        });
      });
    });
  }

  render() {
    const { options } = this.state;

    return (
      <div>
        <PieChart
          highcharts={Highcharts}
          options={options}
          updateArgs={[true]}
        />
      </div>
    );
  }
}
