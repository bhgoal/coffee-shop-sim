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
    } else {
      console.log("already holding item");
    }
  };

  

  render() {
    return (
      <div className="storage">
        <div onClick={this.handleClick} className="storageTarget">
          
        </div>
      </div>
    )
  }
}

export default Storage;
