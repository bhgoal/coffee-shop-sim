import React from "react";
import "./Counter.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Counter = props => (
  <div className="counter" {...props}>
    Counter
  </div>
);

export default Counter;
