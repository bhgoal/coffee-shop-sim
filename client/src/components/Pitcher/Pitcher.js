import React from "react";
import "./Pitcher.css";


const Pitcher = props => {
  const cupDisplay = (props.cupDisplay.status === "filled") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";

  let hasMilk = (props.cupDisplay.milk.type === "none") ? null : props.cupDisplay.milk.type;
  const milkStatus = (props.cupDisplay.milk.status === "none") ? null : props.cupDisplay.milk.status;
  if (hasMilk === "two") {
    hasMilk = "2%";
  }
  if (hasMilk === "halfn") {
    hasMilk = "HnH";
  }
  return (
    <div className="pitcher">
      <div className="hasMilk">{hasMilk}</div>
      <div className="milkStatus">{milkStatus}
      </div>
      <img className="pitcherImg" src={window.location.origin + "/images/pitcher.svg"} />
    </div>
  )
};

export default Pitcher;