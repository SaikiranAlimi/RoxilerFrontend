import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./index.css";

class PriceRangeBarChart extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchChartData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.month !== prevProps.month) {
      this.fetchChartData();
    }
  }

  fetchChartData = () => {
    const { month } = this.props;
    const apiUrl = `http://localhost:4000/bar-chart?month=${month}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ data: data, loading: false }))
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  };

  renderMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1]; // month is 1-based index
  };

  render() {
    const { data, loading, error } = this.state;
    const { month } = this.props;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="bar-chart-container">
        <h1>BarChart -{this.renderMonthName(month)}</h1>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="itemCount" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}

export default PriceRangeBarChart;
