import React from "react";
import "./Cup.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Cup = props => (
  <div className="cup" {...props}>
    <img src={window.location.origin + '/images/coffeeCup.svg'} />
  </div>
);

export default Cup;
