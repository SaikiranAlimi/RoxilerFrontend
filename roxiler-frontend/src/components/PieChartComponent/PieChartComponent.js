import React, { Component } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

import "./index.css";

class PieChartComponent extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchCategoryData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.fetchCategoryData();
    }
  }

  fetchCategoryData = () => {
    const { month } = this.props;
    const apiUrl = `http://localhost:4000/pie-chart?month=${month}`;
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => this.setState({ data, loading: false, error: null }))
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
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="pieChart-container">
        <h1 className="piechart-main-heading">
          Pie Chart - {this.renderMonthName(month)}
        </h1>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="itemCount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  }
}

export default PieChartComponent;
