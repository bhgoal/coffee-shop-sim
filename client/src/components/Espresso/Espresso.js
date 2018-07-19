import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import "./Espresso.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

class Espresso extends Component {
  state = {
    itemHere: null
  };

  handleClick = () => {
    if (this.props.itemInHand != null) {
      if (this.state.itemHere != null) {
        console.log("cup already here");
      } else {
        this.setState({itemHere: this.props.itemInHand});
        this.props.handleItemPickup(null);
        console.log("cup placed");
      }
    } else if (this.props.itemInHand === null) {
      if (this.state.itemHere != null) {
        this.props.handleItemPickup(this.state.itemHere);
        this.setState({itemHere: null}); 
        console.log("cup picked up");
      } else {
        console.log("nothing here");
      }
    }
  };

  

  render() {
    const itemHere = (this.state.itemHere != null) ?
    <Cup cupDisplay={this.state.itemHere} /> :
    null;
    var className = (this.state.itemHere != null) ? 'target cupIsHere' : 'target';
    return (
      <div className="espresso">
      Espresso
        <div onClick={this.handleClick} className={className}>
          Target area {itemHere}
        </div>
      </div>
    )
  }
}


export default Espresso;
