import React from "react";
import "./Fridge.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Fridge = props => (
  <div className="fridge" {...props}>
    Fridge
  </div>
);

export default Fridge;
