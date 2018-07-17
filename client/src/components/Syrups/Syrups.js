import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import "./Syrups.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

class Syrups extends Component {
  state = {
    cupIsHere: true
  };

  handleClick = () => {
    if (this.props.cupInHand) {
      if (this.state.cupIsHere) {
        console.log("cup already here");
      } else {
        this.setState({cupIsHere: true});
        this.props.handleCupClick();
        console.log("cup placed");
      }
    } else if (!this.props.cupInHand) {
      if (this.state.cupIsHere) {
        this.setState({cupIsHere: false});
        this.props.handleCupClick();
        console.log("cup picked up");
      } else {
        console.log("nothing here");
      }
    }
  };

  

  render() {
    const cupDisplay = (this.state.cupIsHere) ?
    <Cup /> :
    null;
    var className = this.state.cupIsHere ? 'target cupIsHere' : 'target';
    return (
      <div className="syrups">
      Syrups
        <div onClick={this.handleClick} className={className}>
          Target area {cupDisplay}
        </div>
      </div>
    )
  }
}

export default Syrups;
