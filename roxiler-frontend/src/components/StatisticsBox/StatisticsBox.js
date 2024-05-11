//importing the react components
import React, { Component } from "react";

//Importing the css file
import "./index.css";

const MONTH_NAMES = [
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
]; // Array of month names for display

class StatisticsBox extends Component {
  state = {
    loading: true,
    error: null,
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  };

  componentDidUpdate(prevProps) {
    // Fetch new data when the month changes
    if (prevProps.month !== this.props.month) {
      this.fetchStatistics();
    }
  }

  componentDidMount() {
    this.fetchStatistics();
  }

  fetchStatistics = () => {
    const { month } = this.props;
    const apiUrl = `http://localhost:4000/statistics?month=${month}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) =>
        this.setState({
          totalSalesAmount: data.totalSalesAmount,
          totalSoldItems: data.totalSoldItems,
          totalNotSoldItems: data.totalNotSoldItems,
          loading: false,
          error: null,
        })
      )
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  };

  render() {
    const {
      loading,
      error,
      totalSalesAmount,
      totalSoldItems,
      totalNotSoldItems,
    } = this.state;
    const { month } = this.props; // Getting the month prop
    const monthName = MONTH_NAMES[parseInt(month, 10) - 1]; // Convert month number to month name

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="transactions-statistics">
        <h3 className="statistics-box-main-heading">
          Transaction Statistics - {monthName}
        </h3>
        <p className="statistics-box-result">
          Total Sales Amount: ${totalSalesAmount.toFixed(2)}
        </p>
        <p className="statistics-box-result">
          Total Sold Items: {totalSoldItems}
        </p>
        <p className="statistics-box-result">
          Total Not Sold Items: {totalNotSoldItems}
        </p>
      </div>
    );
  }
}

export default StatisticsBox;
