import React from "react";
import "./SteamWand.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SteamWand = props => (
  <span className="steamWand" {...props}>
    SteamWand
  </span>
);

export default SteamWand;
