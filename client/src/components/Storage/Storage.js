import React from "react";
import "./Storage.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Storage = props => (
  <div className="storage" {...props}>
    Storage
  </div>
);

export default Storage;
