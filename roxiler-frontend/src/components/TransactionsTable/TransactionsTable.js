import React from "react";

import "./index.css";

const TransactionsTable = (props) => {
  const { transactions } = props;
  return (
    <div className="transactions-table-container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Sold" : "Not Sold"}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
