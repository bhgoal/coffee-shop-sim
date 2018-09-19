import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import Milk from "../Milk/Milk.js";
import Pitcher from "../Pitcher/Pitcher.js";
import "./Counter.css";

const components = {
  cup: Cup,
  milk: Milk,
  pitcher: Pitcher
};

class Counter extends Component {
  state = {
    itemHere0: {type: "pitcher", id: 0, milk: {type: "none", status: "none"}},
    itemHere1: null,
    dropHighlight: [false, false]
  };

  componentDidUpdate = () => {
    this.state.dropHighlight.forEach((value, i) => {
      let dropHighlight = this.state.dropHighlight;
      let itemHere = this.state["itemHere" + i];
      if (this.props.itemInHand) {
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
    if (this.state[id]) {
      const validStack = {
        pitcher: ["milk"],
        cup: ["milk"],
        milk: []
      }
      if (inHand.type === "pitcher" && inHand.milk.type != "none") {
        validStack["cup"].push("pitcher");
      }
      return (validStack[this.state[id].type].includes(inHand.type))
    } else {
      return true;
    }
  }

  handleStack = (id, inHand) => {
    if (inHand.type === "milk") {
      if (this.state[id].milk.type === "none") {
        this.setState({
          [id]: {...this.state[id], milk: {type: inHand.milkType, status: "cold"}}
        })
        console.log(`filling pitcher with ${inHand.milkType} milk...`);
      } else {
        console.log("already has milk");
      }
    } 
    if (inHand.type === "pitcher") {
      if (this.state[id].milk.type === "none") {
        if (inHand.milk.type != "none") {
          this.setState({
            [id]: {...this.state[id], milk: inHand.milk}
          })
          console.log("filling cup with pitcher milk");
          this.props.changeInHand({type: "pitcher", id: 0, milk: {type: "none", status: "none"}});
        } else {
          console.log("pitcher is empty");
        }
      } else {
        console.log("already has milk");
      }
    }
  }


  handleClick = (id, e) => {
    if (this.props.itemInHand != null) {
      if (this.state[id] != null) {
        if (this.validate(id, this.props.itemInHand)) {
          console.log("valid stack");
          this.handleStack(id, this.props.itemInHand);
        } else {
          console.log("invalid stack");
        }
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
    
    var className0 = (this.state.dropHighlight[0]) ? 'validDrop ' : "";
    var className1 = (this.state.dropHighlight[1]) ? 'validDrop ' : "";
    return (
      <div className="counter">
        <div onClick={(e) => this.handleClick("itemHere0", e)} className={'counterTarget0 ' + className0 + pickupHover0}>
          {target0}
        </div>
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'counterTarget1 ' + className1 + pickupHover1}>
          {target1}
        </div>
      </div>
    )
  }
}


export default Counter;
