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
    dropHighlight1: false,
    dropHighlight2: false,
    dropHighlight3: false,
    itemHere1: null,
    itemHere2: null,
    itemHere3: null
  };

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "cup" && this.state.dropHighlight1 === false && this.state.itemHere1 === null) {
        this.setState({dropHighlight1: true});
      }
    } else if (this.state.dropHighlight1 === true) {
      this.setState({dropHighlight1: false});
    }
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "cup" && this.state.dropHighlight2 === false && this.state.itemHere2 === null) {
        this.setState({dropHighlight2: true});
      }
    } else if (this.state.dropHighlight2 === true) {
      this.setState({dropHighlight2: false});
    }
    if (this.props.itemInHand) {
      if (this.props.itemInHand.type === "cup" && this.state.dropHighlight3 === false && this.state.itemHere3 === null) {
        this.setState({dropHighlight3: true});
      }
    } else if (this.state.dropHighlight3 === true) {
      this.setState({dropHighlight3: false});
    }
  }

  validate = (id, type) => {
    if (this.state[id]) {
      const validStack = {
        cup: "pitcher"
      }
      return (type === validStack[this.state[id].type])
    } else {
      const validPlace = {
        itemHere1: "cup",
        itemHere2: "cup",
        itemHere3: "cup"
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
    
    var className1 = (this.state.dropHighlight1) ? 'validDrop' : "";
    var className2 = (this.state.dropHighlight2) ? 'validDrop' : "";
    var className3 = (this.state.dropHighlight3) ? 'validDrop' : "";

    return (
      <div className="syrups">
        <img className="bottle" src={window.location.origin + "/images/vanilla.svg"} />
        <img className="bottle" src={window.location.origin + "/images/caramel.svg"} />
        <img className="bottle" src={window.location.origin + "/images/mocha.svg"} />
      Syrups
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'syrup1 ' + className1}>
          1 {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'syrup2 ' + className2}>
          2 {target2}
        </div>
        <div onClick={(e) => this.handleClick("itemHere3", e)} className={'syrup3 ' + className3}>
          3 {target3}
        </div>
        <div onClick={(e) => this.dispenseSyrup("1", e)} className="syrupButton1">
          V
        </div>
        <div onClick={(e) => this.dispenseSyrup("2", e)}className="syrupButton2">
          C
        </div>
        <div onClick={(e) => this.dispenseSyrup("3", e)}className="syrupButton3">
          M
        </div>
      </div>
    )
  }
}


export default Syrups;
