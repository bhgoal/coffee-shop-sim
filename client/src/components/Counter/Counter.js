import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import "./Counter.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

class Counter extends Component {
  state = {
    itemHere1: null,
    itemHere2: null
  };

  handleClick = (id, e) => {
    if (this.props.itemInHand != null) {
      if (this.state[id] != null) {
        console.log("cup already here");
      } else {
        this.setState({[id]: this.props.itemInHand});
        this.props.handleItemPickup(null);
        console.log("cup placed");
      }
    } else if (this.props.itemInHand === null) {
      if (this.state[id] != null) {
        this.props.handleItemPickup(this.state[id]);
        this.setState({[id]: null}); 
        console.log("cup picked up");
      } else {
        console.log("nothing here");
      }
    }
  };

  

  render() {
    const target1 = (this.state.itemHere1 != null) ?
    <Cup cupDisplay={this.state.itemHere1} /> :
    null;
    const target2 = (this.state.itemHere2 != null) ?
    <Cup cupDisplay={this.state.itemHere2} /> :
    null;
    var className1 = (this.state.itemHere1 != null) ? 'cupIsHere' : "";
    var className2 = (this.state.itemHere2 != null) ? 'cupIsHere' : "";
    return (
      <div className="counter">
      Counter
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'target1 ' + className1}>
          Target area 1 {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'target2 ' + className2}>
          Target area 2 {target2}
        </div>
      </div>
    )
  }
}


export default Counter;
