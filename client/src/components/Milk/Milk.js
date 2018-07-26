import React from "react";
import "./Milk.css";


const Milk = props => {
  const cupDisplay = (props.cupDisplay.milkType === "whole") ? "/images/wholeMilk.svg" : (props.cupDisplay.milkType === "two") ? "/images/twoMilk.svg" : "/images/halfn.svg";
  const halfn = (props.cupDisplay.milkType === "halfn") ? "halfn" : "";
  return (
    <div className="milk">
      <img className={`milkImg ${halfn}`} src={window.location.origin + cupDisplay} />
    </div>
  )
};

export default Milk;