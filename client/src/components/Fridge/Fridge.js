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
    dropHighlight1: false,
    dropHighlight2: false,
    dropHighlight3: false,
    dropHighlight4: false,
    itemHere1: {type: "milk", id: 0, milkType: "whole"},
    itemHere2: {type: "milk", id: 0, milkType: "halfn"},
    itemHere3: {type: "milk", id: 0, milkType: "two"},
    itemHere4: null
  };

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "milk" && this.state.dropHighlight1 === false && this.state.itemHere1 === null) {
        this.setState({dropHighlight1: true});
      }
    } else if (this.state.dropHighlight1 === true) {
      this.setState({dropHighlight1: false});
    }
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "milk" && this.state.dropHighlight2 === false && this.state.itemHere2 === null) {
        this.setState({dropHighlight2: true});
      }
    } else if (this.state.dropHighlight2 === true) {
      this.setState({dropHighlight2: false});
    }
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "milk" && this.state.dropHighlight3 === false && this.state.itemHere3 === null) {
        this.setState({dropHighlight3: true});
      }
    } else if (this.state.dropHighlight3 === true) {
      this.setState({dropHighlight3: false});
    }
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "milk" && this.state.dropHighlight4 === false && this.state.itemHere4 === null) {
        this.setState({dropHighlight4: true});
      }
    } else if (this.state.dropHighlight4 === true) {
      this.setState({dropHighlight4: false});
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
      const validPlace = {
        itemHere1: "milk",
        itemHere2: "milk",
        itemHere3: "milk",
        itemHere4: "milk"
      }
      return (type === validPlace[id])
    }
  }

  handleClick = (id, e) => {
    if (this.props.itemInHand != null) {
      if (this.state[id] != null) {
        console.log("space occupied");
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
    if (this.state.itemHere1 != null) {
      const Tag1 = components[this.state.itemHere1.type];
      target1 = <Tag1 cupDisplay={this.state.itemHere1} />
    } else {
      target1 = null;
    }
    let target2;
    if (this.state.itemHere2 != null) {
      const Tag2 = components[this.state.itemHere2.type];
      target2 = <Tag2 cupDisplay={this.state.itemHere2} />
    } else {
      target2 = null;
    }
    let target3;
    if (this.state.itemHere3 != null) {
      const Tag3 = components[this.state.itemHere3.type];
      target3 = <Tag3 cupDisplay={this.state.itemHere3} />
    } else {
      target3 = null;
    }
    let target4;
    if (this.state.itemHere4 != null) {
      const Tag4 = components[this.state.itemHere4.type];
      target4 = <Tag4 cupDisplay={this.state.itemHere4} />
    } else {
      target4 = null;
    }
    var className1 = (this.state.dropHighlight1) ? 'validDrop' : "";
    var className2 = (this.state.dropHighlight2) ? 'validDrop' : "";
    var className3 = (this.state.dropHighlight3) ? 'validDrop' : "";
    var className4 = (this.state.dropHighlight4) ? 'validDrop' : "";
    return (
      <div className="fridge">
      Fridge
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'fridgeSpace1 ' + className1}>
          Space 1 {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'fridgeSpace2 ' + className2}>
          Space 2 {target2}
        </div>
        <div onClick={(e) => this.handleClick("itemHere3", e)} className={'fridgeSpace3 ' + className3}>
          Space 3 {target3}
        </div>
        <div onClick={(e) => this.handleClick("itemHere4", e)} className={'fridgeSpace4 ' + className4}>
          Space 4 {target4}
        </div>
      </div>
    )
  }
}

export default Fridge;
