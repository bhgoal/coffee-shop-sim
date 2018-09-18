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
    dropHighlight1: false,
    dropHighlight2: false,
    itemHere1: {type: "pitcher", id: 0, milk: {type: "none", status: "none"}},
    itemHere2: null
  };

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if (this.state.dropHighlight1 === false && ((this.state.itemHere1 === null) || (this.state.itemHere1 && this.state.itemHere1.type === "pitcher" && this.props.itemInHand.type === "milk"))) {
        this.setState({dropHighlight1: true});
      }
    } else if (this.state.dropHighlight1 === true) {
      this.setState({dropHighlight1: false});
    }
    if (this.props.itemInHand) {
      if (this.state.dropHighlight2 === false && ((this.state.itemHere2 === null) || (this.state.itemHere2 && this.state.itemHere2.type === "pitcher" && this.props.itemInHand.type === "milk"))) {
        this.setState({dropHighlight2: true});
      }
    } else if (this.state.dropHighlight2 === true) {
      this.setState({dropHighlight2: false});
    }
  }

  validate = (id, type) => {
    if (this.state[id]) {
      const validStack = {
        pitcher: "milk",
        cup: "pitcher"
      }
      return (type === validStack[this.state[id].type])
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
        if (this.validate(id, this.props.itemInHand.type)) {
          console.log("valid stack");
          this.handleStack(id, this.props.itemInHand);
        } else {
          console.log("invalid stack");
        }
      } else if (this.validate(id, this.props.itemInHand.type)) {
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
    
    var className1 = (this.state.dropHighlight1) ? 'validDrop' : "";
    var className2 = (this.state.dropHighlight2) ? 'validDrop' : "";
    return (
      <div className="counter">
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'counterTarget1 ' + className1 + pickupHover1}>
          {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'counterTarget2 ' + className2 + pickupHover2}>
          {target2}
        </div>
      </div>
    )
  }
}


export default Counter;
