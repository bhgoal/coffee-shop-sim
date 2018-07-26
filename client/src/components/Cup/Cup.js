import React from "react";
import "./Cup.css";


const Cup = props => {
  const cupDisplay = (props.cupDisplay.brownType != "none") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  const hasBrown = (props.cupDisplay.brownType === "none") ? null : props.cupDisplay.brownType;
  const hasSyrup = (props.cupDisplay.syrup === "none") ? null : props.cupDisplay.syrup;
  let hasMilk = (props.cupDisplay.milk.type === "none") ? null : props.cupDisplay.milk.type;
  const milkStatus = hasMilk ? `, ${props.cupDisplay.milk.status}` : null;
  if (hasMilk === "two") {
    hasMilk = "2%";
  }
  if (hasMilk === "halfn") {
    hasMilk = "HnH";
  }
  return (
    <div className="cup">
      <div className="hasBrown">{hasBrown} </div>
      <div className="hasSyrup">{hasSyrup}
      </div>
      <div className="cupHasMilk">{hasMilk}{milkStatus}
      </div>
      <img className="cupImg" src={window.location.origin + cupDisplay} />
    </div>
  )
};

export default Cup;