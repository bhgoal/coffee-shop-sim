import React from "react";
import "./Cup.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

const Cup = props => {
  const cupDisplay = (props.cupDisplay.brownType != "none") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="cup" {...props}>
      <div className="number">{props.cupDisplay.brownType}{props.cupDisplay.milk.type}</div>
      <img className="cupImg" src={window.location.origin + cupDisplay} />
    </div>
  )
};

export default Cup;