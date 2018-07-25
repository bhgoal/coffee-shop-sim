import React from "react";
import "./Pitcher.css";


const Pitcher = props => {
  const cupDisplay = (props.cupDisplay.status === "filled") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="pitcher">
      <div className="hasMilk">{props.cupDisplay.milk.type}</div>
      <div className="milkStatus">{props.cupDisplay.milk.status}
      </div>
      <img src={window.location.origin + "/images/pitcher.svg"} />
    </div>
  )
};

export default Pitcher;