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
    dropHighlight1: false,
    dropHighlight2: false,
    dropHighlight3: false,
    dropHighlight4: false,
    itemHere1: null,
    itemHere2: null,
    itemHere3: null,
    itemHere4: null
  };

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if ((this.props.itemInHand.type === "pitcher" && this.state.dropHighlight1 === false && this.state.itemHere1 === null) || (this.props.itemInHand.type === "milk" && this.state.dropHighlight1 === false && this.state.itemHere1)) {
        this.setState({dropHighlight1: true});
      }
    } else if (this.state.dropHighlight1 === true) {
      this.setState({dropHighlight1: false});
    }
    if (this.props.itemInHand) {
      if ((this.props.itemInHand.type === "cup" && this.state.dropHighlight2 === false && this.state.itemHere2 === null) || (this.props.itemInHand.type === "pitcher" && this.state.dropHighlight2 === false && this.state.itemHere2)) {
        this.setState({dropHighlight2: true});
      }
    } else if (this.state.dropHighlight2 === true) {
      this.setState({dropHighlight2: false});
    }
    if (this.props.itemInHand) {
      if ((this.props.itemInHand.type === "cup" && this.state.dropHighlight3 === false && this.state.itemHere3 === null) || (this.props.itemInHand.type === "pitcher" && this.state.dropHighlight3 === false && this.state.itemHere3)) {
        this.setState({dropHighlight3: true});
      }
    } else if (this.state.dropHighlight3 === true) {
      this.setState({dropHighlight3: false});
    }
    if (this.props.itemInHand) {
      if ((this.props.itemInHand.type === "pitcher" && this.state.dropHighlight4 === false && this.state.itemHere4 === null) || (this.props.itemInHand.type === "milk" && this.state.dropHighlight4 === false && this.state.itemHere4)) {
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
        itemHere1: "pitcher",
        itemHere2: "cup",
        itemHere3: "cup",
        itemHere4: "pitcher"
      }
      return (type === validPlace[id])
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
      <div className="espresso">
        <img className="espressoImg" src={window.location.origin + "/images/espresso.svg"} />
        <div onClick={(e) => this.handleClick("itemHere1", e)} className={'steam1 ' + className1}>
          Steam 1 {target1}
        </div>
        <div onClick={(e) => this.handleClick("itemHere2", e)} className={'spout1 ' + className2}>
          Spout 1 {target2}
        </div>
        <div onClick={(e) => this.handleClick("itemHere3", e)} className={'spout2 ' + className3}>
          Spout 2 {target3}
        </div>
        <div onClick={(e) => this.handleClick("itemHere4", e)} className={'steam2 ' + className4}>
          Steam 2 {target4}
        </div>
        <div onClick={(e) => this.steam("itemHere1", "froth", e)} className="frothButton1">
          F
        </div>
        <div onClick={(e) => this.steam("itemHere1", "steam", e)}className="steamButton1">
          S
        </div>
        <div onClick={(e) => this.pullShot("itemHere2", e)} className="shotButton1">
          E
        </div>
        <div onClick={(e) => this.steam("itemHere4", "froth", e)}className="frothButton2">
          F
        </div>
        <div onClick={(e) => this.steam("itemHere4", "steam", e)} className="steamButton2">
          S
        </div>
        <div onClick={(e) => this.pullShot("itemHere3", e)}className="shotButton2">
          E
        </div>
      </div>
    )
  }
}

export default Espresso;
