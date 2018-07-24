import React from "react";
import "./Pitcher.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

const Pitcher = props => {
  const cupDisplay = (props.cupDisplay.status === "filled") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="pitcher" {...props}>
      <div className="hasMilk">{props.cupDisplay.milk.type}</div>
      <div className="milkStatus">{props.cupDisplay.milk.status}
      </div>
      <img src={window.location.origin + "/images/pitcher.svg"} />
    </div>
  )
};

export default Pitcher;