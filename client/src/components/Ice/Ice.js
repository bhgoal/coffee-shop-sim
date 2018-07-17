import React from "react";
import "./Ice.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Ice = props => (
  <div className="ice" {...props}>
    Ice
  </div>
);

export default Ice;
