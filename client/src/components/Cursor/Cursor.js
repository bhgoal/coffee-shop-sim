import React from "react";
import "./Cursor.css";


const Cursor = props => {

let image;
let width;
    let offset;
    if (props.itemInHand) {
      if (props.itemInHand.type === "cup") {
        if (props.itemInHand.brownType === "none") {
          image = "coffeeCup.svg";
          width = "6vw";
          
        } else {
          image = "coffeeCupFilled.svg";
          width = "6vw";
        }
        offset = "52 63";
      } else if (props.itemInHand.type === "milk") {
        if (props.itemInHand.milkType === "whole") {
          image = "wholeMilk.svg";
          width = "6vw";
        } else if (props.itemInHand.milkType === "two") {
          image = "twoMilk.svg";
          width = "6vw";
        } else {
          image = "halfn.svg";
          width = "3vw";
        }
        offset = "50 50";
      } else if (props.itemInHand.type === "pitcher") {
        image = "pitcher.svg";
        width = "6vw";
        offset = "45 50";
      }
    }

const cursorLocation = (props.cursorMove === true) ? {

  zIndex: "100",
  position: "absolute",
  width: width,
  left: props.mouseX, 
  top: props.mouseY,
  cursor: "none",
  pointerEvents: "none"
} : {
  zIndex: "-2",
  position: "absolute",
  width: "50px",
  height: "50px",
} 

return (
    <img className="cursor" style={cursorLocation} src={window.location.origin + "/images/" + image} />
  )
};

export default Cursor;
