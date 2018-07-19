import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import "./Storage.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

class Storage extends Component {
  state = {
    cupIsHere: true,
    itemHere: {type: "cup", id: 0, status: "empty"}
  };

  handleClick = () => {
    if (!this.props.itemInHand) {
      this.props.handleItemPickup(this.state.itemHere);
      this.setState((prevState) => ({
        itemHere: {type: "cup", id: prevState.itemHere.id + 1, status: "empty"}
      })); 
      console.log("new cup picked up");
    } else {
      console.log("already holding item");
    }
  };

  

  render() {
    var className = this.state.cupIsHere ? 'target cupIsHere' : 'target';
    return (
      <div className="storage">
      Storage
        <div onClick={this.handleClick} className={className}>
          Target area <Cup cupDisplay={this.state.itemHere} />
        </div>
      </div>
    )
  }
}

export default Storage;
