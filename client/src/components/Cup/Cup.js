import React from "react";
import "./Cup.css";


const Cup = props => {
  const cupDisplay = (props.cupDisplay.brownType != "none") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="cup">
      <div className="hasBrown">{props.cupDisplay.brownType} </div>
      <div className="hasSyrup">{props.cupDisplay.syrup}
      </div>
      <div className="cupHasMilk">{props.cupDisplay.milk.type}, {props.cupDisplay.milk.status}
      </div>
      <img className="cupImg" src={window.location.origin + cupDisplay} />
    </div>
  )
};

export default Cup;