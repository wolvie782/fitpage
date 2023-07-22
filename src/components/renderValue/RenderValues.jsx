import { useState } from "react";
import React from "react";

const RenderValues = ({ values }) => {
  debugger;
  const [showAllValues, setShowAllValues] = useState(false);

  const toggleValuesVisibility = () => {
    setShowAllValues((prev) => !prev);
  };

  return (
    <span className="values-toggle" onClick={toggleValuesVisibility}>
      {showAllValues ? `[${values.join(" | ")}]` : `[${values[0]}]`}
    </span>
  );
};

export default RenderValues;
