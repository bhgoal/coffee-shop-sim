import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import "./Storage.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

class Storage extends Component {
  state = {
    itemHere: {type: "cup", id: 0, brownType: "none", milk: {type: "none", status: "none"}, syrup: "none"}
  };

  handleClick = () => {
    if (!this.props.itemInHand) {
      this.props.handleItemPickup(this.state.itemHere);
      this.setState({
        itemHere: {...this.state.itemHere, id: this.state.itemHere.id + 1}
      }); 
      console.log("new cup picked up");
    } else if (this.props.itemInHand.type === "cup" && this.props.itemInHand.brownType === "none" && this.props.itemInHand.milk.type === "none" && this.props.itemInHand.syrup === "none"){
      this.props.emptyHand();
      console.log("empty cup replaced");
    }
  };

  

  render() {
    let pickupHover = (this.props.itemInHand) ? "" : "pickupHover";

    return (
      <div className="storage">
        <div onClick={this.handleClick} className={"storageTarget " + pickupHover}>
          
        </div>
      </div>
    )
  }
}

export default Storage;
