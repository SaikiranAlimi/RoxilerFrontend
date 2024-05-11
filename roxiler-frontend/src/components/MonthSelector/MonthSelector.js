import React from "react";

import "./index.css";

const MonthSelector = (props) => {
  const { month, onMonthChange } = props;

  return (
    <select
      value={month}
      onChange={(e) => onMonthChange(e.target.value)}
      className="Select-option"
    >
      <option value="01" className="option-style">
        January
      </option>
      <option value="02" className="option-style">
        February
      </option>
      <option value="03" className="option-style">
        March
      </option>
      <option value="04" className="option-style">
        April
      </option>
      <option value="05" className="option-style">
        May
      </option>
      <option value="06" className="option-style">
        June
      </option>
      <option value="07" className="option-style">
        July
      </option>
      <option value="08" className="option-style">
        August
      </option>
      <option value="09" className="option-style">
        September
      </option>
      <option value="10" className="option-style">
        October
      </option>
      <option value="11" className="option-style">
        November
      </option>
      <option value="12" className="option-style">
        December
      </option>
    </select>
  );
};

export default MonthSelector;
