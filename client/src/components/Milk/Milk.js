import React from "react";
import "./Milk.css";


const Milk = props => {
  const cupDisplay = (props.cupDisplay.status === "filled") ? "/images/coffeeCupFilled.svg" : "/images/coffeeCup.svg";
  return (
    <div className="milk">
      <div className="milkJug">{props.cupDisplay.milkType}</div>
      <img src={window.location.origin + "/images/milk.svg"} />
    </div>
  )
};

export default Milk;