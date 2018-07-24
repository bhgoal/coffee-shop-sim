import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import Milk from "../Milk/Milk.js";
import "./Fridge.css";

const components = {
  cup: Cup,
  milk: Milk
};

class Fridge extends Component {
  state = {
    dropHighlight: false,
    itemHere: {type: "milk", id: 0, status: "empty"}
  };

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "cup" && this.state.dropHighlight === false && this.state.itemHere === null) {
        this.setState({dropHighlight: true});
      }
    } else if (this.state.dropHighlight === true) {
      this.setState({dropHighlight: false});
    }
  }

  handleClick = () => {
    if (this.props.itemInHand != null) {
      if (this.state.itemHere != null) {
        console.log("cup already here");
      } else {
        this.setState({itemHere: this.props.itemInHand});
        this.props.handleItemPickup(null);
        this.setState({dropHighlight: false});
        console.log("cup placed");
      }
    } else if (this.props.itemInHand === null) {
      if (this.state.itemHere != null) {
        this.props.handleItemPickup(this.state.itemHere);
        this.setState({dropHighlight: false, itemHere: null}); 
        console.log("cup picked up");
      } else {
        console.log("nothing here");
      }
    }
  };

  

  render() {
    let itemHere;
    if (this.state.itemHere != null) {
      const Tag = components[this.state.itemHere.type];
      itemHere = <Tag cupDisplay={this.state.itemHere} />
    } else {
      itemHere = null;
    }
    var className = (this.state.dropHighlight) ? 'target validDrop' : 'target';
    return (
      <div className="fridge">
      Fridge
        <div onClick={this.handleClick} className={className}>
          Target area {itemHere}
        </div>
      </div>
    )
  }
}

export default Fridge;
