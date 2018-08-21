import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import Milk from "../Milk/Milk.js";
import "./Syrups.css";

const components = {
  cup: Cup,
  milk: Milk
};

class Syrups extends Component {
  state = {
    itemHere0: null,
    itemHere1: null,
    itemHere2: null,
    dropHighlight: [false, false, false]
  };

  componentDidUpdate = () => {
    this.state.dropHighlight.forEach((value, i) => {
      let dropHighlight = this.state.dropHighlight;
      if (this.props.itemInHand) {
        if (this.props.itemInHand.type === "cup" && this.state.dropHighlight[i] === false && this.state["itemHere" + i] === null) {
          dropHighlight[i] = true;
          this.setState({dropHighlight: dropHighlight});
        }
      } else if (this.state.dropHighlight[i] === true) {
        dropHighlight[i] = false;
        this.setState({dropHighlight: dropHighlight});
      }
    });
  }

  validate = (id, type) => {
    if (this.state[id]) {
      const validStack = {
        cup: "pitcher"
      }
      return (type === validStack[this.state[id].type])
    } else {
      const validPlace = {
        itemHere0: "cup",
        itemHere1: "cup",
        itemHere2: "cup"
      }
      return (type === validPlace[id])
    }
  }

  handleStack = (id, inHand) => {
    if (inHand.type === "milk") {
      if (this.state[id].milk.type === "none") {
        this.setState({
          [id]: {...this.state[id], milk: {type: "whole", status: "cold"}}
        })
        console.log(`filling ${this.state[id].type} with fresh milk...`);
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
  
  dispenseSyrup = (idNum, e) => {
    const id = "itemHere" + idNum;
    console.log(id);
    const flavors = ["vanilla", "caramel", "mocha"];
    if (this.state[id] != null && this.state[id].syrup === "none") {
      this.setState({
        [id]: {...this.state[id], syrup: flavors[parseInt(idNum) - 1]}
      })
      console.log(`adding ${flavors[parseInt(idNum) - 1]} syrup`);
    } else if (this.state[id] != null && this.state[id].syrup != "none") {
      console.log(`already filled with ${this.state[id].syrup} syrup`);
    } else {
      console.log("no cup here");
    }
  }
  

  render() {
    let target0;
    if (this.state.itemHere0 != null) {
      const Tag0 = components[this.state.itemHere0.type];
      target0 = <Tag0 cupDisplay={this.state.itemHere0} />
    } else {
      target0 = null;
    }
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
    
    var className0 = (this.state.dropHighlight[0]) ? 'validDrop' : "";
    var className1 = (this.state.dropHighlight[1]) ? 'validDrop' : "";
    var className2 = (this.state.dropHighlight[2]) ? 'validDrop' : "";

    return (
      <div className="syrups">
        <img className="bottle" src={window.location.origin + "/images/vanilla.svg"} />
        <img className="bottle" src={window.location.origin + "/images/caramel.svg"} />
        <img className="bottle" src={window.location.origin + "/images/mocha.svg"} />
        <div onClick={(e) => this.handleClick("itemHere0", e)} className={'syrup0 ' + className0}>
          {target0}
        </div>
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'syrup1 ' + className1}>
          {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'syrup2 ' + className2}>
          {target2}
        </div>
        <div onClick={(e) => this.dispenseSyrup("0", e)} className="syrupButton0">
        </div>
        <div onClick={(e) => this.dispenseSyrup("1", e)}className="syrupButton1">
        </div>
        <div onClick={(e) => this.dispenseSyrup("2", e)}className="syrupButton2">
        </div>
      </div>
    )
  }
}


export default Syrups;
