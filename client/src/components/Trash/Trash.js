import React from "react";
import "./Trash.css";

const Trash = props => {
  var hover = (props.itemInHand) ? "pickupHover" : "";

  return (
    <div className={"trash " + hover} onClick={props.emptyHand}>
    </div>
  )
};

export default Trash;
