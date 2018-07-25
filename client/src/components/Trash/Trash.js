import React from "react";
import "./Trash.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Trash = props => (
  <div className="trash" {...props}>
    Trash
  </div>
);

export default Trash;
