import React, { Component } from "react";
import TransactionsTable from "./components/TransactionsTable/TransactionsTable";
import MonthSelector from "./components/MonthSelector/MonthSelector";
import SearchBox from "./components/SearchBox/SearchBox";
import StatisticsBox from "./components/StatisticsBox/StatisticsBox";
import PriceRangeBarChart from "./components/PriceRangeBarChart/PriceRangeBarChart";
import PieChartComponent from "./components/PieChartComponent/PieChartComponent";

//importing the css file
import "./App.css";

class App extends Component {
  state = {
    month: "03", // Default to March
    search: "",
    page: 1,
    perPage: 10,
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = () => {
    const { month, search, page, perPage } = this.state;
    const apiUrl = `http://localhost:4000/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ transactions: data }))
      .catch((error) => console.error("Error fetching data:", error));
  };

  handleMonthChange = (month) => {
    this.setState({ month }, () => {
      this.fetchTransactions();
    });
  };

  handleSearchChange = (search) => {
    this.setState({ search, page: 1 }, () => {
      this.fetchTransactions();
    });
  };

  handlePagination = (direction) => {
    let { page } = this.state;
    page = direction === "next" ? page + 1 : page - 1;
    this.setState({ page }, () => {
      this.fetchTransactions();
    });
  };

  render() {
    const { transactions, month, search, page, perPage } = this.state;
    return (
      <div className="app-container">
        <div className="dashboard-name-container">
          <h1>
            Transactions <br /> Dashboard
          </h1>
        </div>

        <div id="month-searchbox-selectors-container">
          <MonthSelector month={month} onMonthChange={this.handleMonthChange} />
          <SearchBox search={search} onSearchChange={this.handleSearchChange} />
        </div>

        <div className="transactions-table-container">
          <TransactionsTable transactions={transactions} />
        </div>

        <div className="controls-container">
          <p className="page-text">Page: {page}</p>
          <div>
            <button
              className="previous-next-buttons"
              onClick={() => this.handlePagination("prev")}
            >
              Previous
            </button>
            <button
              className="previous-next-buttons"
              onClick={() => this.handlePagination("next")}
            >
              Next
            </button>
          </div>
          <p className="page-text">perPage: {perPage}</p>
        </div>

        <div className="statisBox-container">
          <StatisticsBox month={month} />
        </div>

        <div>
          <PriceRangeBarChart month={month} />
        </div>

        <div className="pie-chart-container">
          <PieChartComponent month={month} />
        </div>
      </div>
    );
  }
}

export default App;
