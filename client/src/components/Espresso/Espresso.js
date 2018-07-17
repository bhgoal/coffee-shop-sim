import React from "react";
import "./Espresso.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Espresso = props => (
  <div className="espresso" {...props}>
    Espresso
  </div>
);

export default Espresso;
