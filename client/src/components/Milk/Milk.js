import React from "react";
import "./Milk.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

const Milk = props => {
  const cupDisplay = (props.cupDisplay.status === "filled") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="milk" {...props}>
      <div className="number">{props.cupDisplay.milkType}</div>
      <img src={window.location.origin + "/images/milk.svg"} />
    </div>
  )
};

export default Milk;