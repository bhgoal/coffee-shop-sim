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
    itemHere0: {type: "milk", id: 0, milkType: "whole"},
    itemHere1: {type: "milk", id: 0, milkType: "halfn"},
    itemHere2: {type: "milk", id: 0, milkType: "two"},
    itemHere3: null,
    dropHighlight: [false, false, false, false]
  };

  componentDidUpdate = () => {
    this.state.dropHighlight.forEach((value, i) => {
      let dropHighlight = this.state.dropHighlight;
      let itemHere = this.state["itemHere" + i];
      if (this.props.itemInHand && !itemHere) {
        if (this.state.dropHighlight[i] === false) {
          if (this.validate("itemHere" + i, this.props.itemInHand)) {
            dropHighlight[i] = true;
            this.setState({dropHighlight: dropHighlight});
          }
        }
      } else if (this.state.dropHighlight[i] === true) {
        dropHighlight[i] = false;
        this.setState({dropHighlight: dropHighlight});
      }
    });
  }

  validate = (id, inHand) => {
    const validPlace = {
      itemHere0: "milk",
      itemHere1: "milk",
      itemHere2: "milk",
      itemHere3: "milk"
    }
    return (inHand.type === validPlace[id])
    
  }

  handleClick = (id, e) => {
    if (this.props.itemInHand != null) {
      if (this.state[id] != null) {
        console.log("space occupied");
      } else if (this.validate(id, this.props.itemInHand)) {
        this.setState({[id]: this.props.itemInHand});
        this.props.handleItemPickup(null);
        console.log("cup placed");
      } else {
        console.log("invalid type");
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
    let target0;
    let pickupHover0;
    if (this.state.itemHere0 != null) {
      if (!this.props.itemInHand) {
        pickupHover0 = "pickupHover";
      }
      const Tag0 = components[this.state.itemHere0.type];
      target0 = <Tag0 cupDisplay={this.state.itemHere0} />
    } else {
      pickupHover0 = "";
      target0 = null;
    }
    let target1;
    let pickupHover1;
    if (this.state.itemHere1 != null) {
      if (!this.props.itemInHand) {
        pickupHover1 = "pickupHover";
      }
      const Tag1 = components[this.state.itemHere1.type];
      target1 = <Tag1 cupDisplay={this.state.itemHere1} />
    } else {
      pickupHover1 = "";
      target1 = null;
    }
    let target2;
    let pickupHover2;
    if (this.state.itemHere2 != null) {
      if (!this.props.itemInHand) {
        pickupHover2 = "pickupHover";
      }
      const Tag2 = components[this.state.itemHere2.type];
      target2 = <Tag2 cupDisplay={this.state.itemHere2} />
    } else {
      pickupHover2 = "";
      target2 = null;
    }
    let target3;
    let pickupHover3;
    if (this.state.itemHere3 != null) {
      if (!this.props.itemInHand) {
        pickupHover3 = "pickupHover";
      }
      const Tag3 = components[this.state.itemHere3.type];
      target3 = <Tag3 cupDisplay={this.state.itemHere3} />
    } else {
      pickupHover3 = "";
      target3 = null;
    }
  
    var className0 = (this.state.dropHighlight[0]) ? 'validDrop ' : "";
    var className1 = (this.state.dropHighlight[1]) ? 'validDrop ' : "";
    var className2 = (this.state.dropHighlight[2]) ? 'validDrop ' : "";
    var className3 = (this.state.dropHighlight[3]) ? 'validDrop ' : "";
    
    return (
      <div className="fridge">
        <div onClick={(e) => this.handleClick("itemHere0", e)} className={'fridgeSpace0 ' + className0 + pickupHover0}>
          {target0}
        </div>
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'fridgeSpace1 ' + className1 + pickupHover1}>
          {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'fridgeSpace2 ' + className2 + pickupHover2}>
          {target2}
        </div>
        <div onClick={(e) => this.handleClick("itemHere3", e)} className={'fridgeSpace3 ' + className3 + pickupHover3}>
          {target3}
        </div>
      </div>
    )
  }
}

export default Fridge;
