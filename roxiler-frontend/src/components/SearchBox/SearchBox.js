import React from "react";

import "./index.css";

const SearchBox = ({ search, onSearchChange }) => (
  <input
    type="text"
    placeholder="Search transactions"
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    className="search-box-input"
  />
);

export default SearchBox;
