import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import Milk from "../Milk/Milk.js";
import Pitcher from "../Pitcher/Pitcher.js"
import "./Espresso.css";

const components = {
  cup: Cup,
  milk: Milk,
  pitcher: Pitcher
};

class Espresso extends Component {
  state = {
    itemHere0: null,
    itemHere1: null,
    itemHere2: null,
    itemHere3: null,
    dropHighlight: [false, false, false, false]
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
        cup: ["milk"]
      }
      if (inHand.type === "pitcher" && inHand.milk.type != "none") {
        validStack["cup"].push("pitcher");
      }
      return (validStack[this.state[id].type].includes(inHand.type))
    } else {
      const validPlace = {
        itemHere0: "pitcher",
        itemHere1: "cup",
        itemHere2: "cup",
        itemHere3: "pitcher"
      }
      return (inHand.type === validPlace[id])
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

  pullShot = (id, e) => {
    if (this.state[id] != null && this.state[id].brownType === "none") {
      this.setState({
        [id]: {...this.state[id], brownType: "espresso"}
      })
      console.log("pulling espresso...");
    } else if (this.state[id] != null && this.state[id].brownType != "none") {
      console.log(`already filled with ${this.state[id].brownType}`);
    } else {
      console.log("no cup here");
    }
  }

  steam = (id, action, e) => {
    if (this.state[id] != null && this.state[id].milk.type === "none") {
      console.log("pitcher is empty");
    } else if (this.state[id] != null && this.state[id].milk.status === "cold") {
      this.setState({
        [id]: {...this.state[id], milk: {type: this.state[id].milk.type, status: `${action}ed`}}
      })
      console.log(`${action}ing milk...`);
    } else if (this.state[id] != null && this.state[id].milk.status != "cold") {
      console.log(`milk is already ${this.state[id].milk.status}`);
    } else {
      console.log("no pitcher here");
    }
  }

  render() {
    let target0 = null;
    let pickupHover0 = "";
    if (this.state.itemHere0 != null) {
      if (!this.props.itemInHand) {
        pickupHover0 = "pickupHover";
      }
      const Tag0 = components[this.state.itemHere1.type];
      target0 = <Tag0 cupDisplay={this.state.itemHere1} />
    }
    let target1 = null;
    let pickupHover1 = "";
    if (this.state.itemHere1 != null) {
      if (!this.props.itemInHand) {
        pickupHover1 = "pickupHover";
      }
      const Tag1 = components[this.state.itemHere1.type];
      target1 = <Tag1 cupDisplay={this.state.itemHere1} />
    }
    let target2 = null;
    let pickupHover2 = "";
    if (this.state.itemHere2 != null) {
      if (!this.props.itemInHand) {
        pickupHover2 = "pickupHover";
      }
      const Tag2 = components[this.state.itemHere2.type];
      target2 = <Tag2 cupDisplay={this.state.itemHere2} />
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
      <div className="espresso">
        <img className="espressoImg" src={window.location.origin + "/images/espresso.svg"} />
        <div onClick={(e) => this.handleClick("itemHere0", e)} className={'steam1 ' + className0 + pickupHover0}>
          {target0}
        </div>
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'spout1 ' + className1 + pickupHover1}>
          {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'spout2 ' + className2 + pickupHover2}>
          {target2}
        </div>
        <div onClick={(e) => this.handleClick("itemHere3", e)} className={'steam2 ' + className3 + pickupHover3}>
          {target3}
        </div>
        <div onClick={(e) => this.steam("itemHere0", "froth", e)} className="frothButton1">
          Froth
        </div>
        <div onClick={(e) => this.steam("itemHere0", "steam", e)}className="steamButton1">
          Steam
        </div>
        <div onClick={(e) => this.pullShot("itemHere1", e)} className="shotButton1">
          Pull Shot
        </div>
        <div onClick={(e) => this.steam("itemHere3", "froth", e)}className="frothButton2">
          Froth
        </div>
        <div onClick={(e) => this.steam("itemHere3", "steam", e)} className="steamButton2">
          Steam
        </div>
        <div onClick={(e) => this.pullShot("itemHere2", e)}className="shotButton2">
          Pull Shot
        </div>
      </div>
    )
  }
}

export default Espresso;
