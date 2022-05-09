import React, { Component } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";
import { barChartData, barChartOptions } from "variables/charts";
import axios from 'axios';

class BarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resdata:[],
      l:2,
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:9091/api/reservations/allReser`)
    .then(res => {
      const resdata = res.data;
      this.setState({ resdata });
      const l = resdata.length
      this.setState({ l });
    })
    this.setState({
      chartData: [ {
        name: "Réservations",
        data: [this.state.l , 0, 0, 0, 0, 0, 0, 0, 0],
      },],
      chartOptions: barChartOptions,
    });
  }

  render() {
    return (
      <Card
        py="1rem"
        height={{ sm: "200px" }}
        width="100%"
        bg="linear-gradient(81.62deg, green 2.25%, white 79.87%)"
        position="relative"
      >
        <Chart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          width="100%"
          height="100%"
        />
      </Card>
    );
  }
}

export default BarChart;
