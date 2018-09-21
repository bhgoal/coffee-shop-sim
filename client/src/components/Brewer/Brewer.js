import React, { Component } from "react";
import Cup from "../Cup/Cup.js";
import Milk from "../Milk/Milk.js";
import "./Brewer.css";

const components = {
  cup: Cup,
  milk: Milk
};

class Brewer extends Component {
  state = {
    dropHighlight: false,
    stackHighlight: false,
    itemHere: null
  };

  

  componentDidUpdate = () => {
    if (this.props.itemInHand) {
      if (this.state.dropHighlight === false) {
        if (this.validate("itemHere", this.props.itemInHand) === "place") {
          this.setState({dropHighlight: true});
        }
      }
      if (this.state.stackHighlight === false) {
        if (this.validate("itemHere", this.props.itemInHand) === "stack") {
          this.setState({stackHighlight: true});
        }
      }
    } else if (this.state.dropHighlight === true) {
      this.setState({dropHighlight: false});
    } else if (this.state.stackHighlight === true) {
      this.setState({stackHighlight: false});
    }
  }

  validate = (id, inHand) => {
    if (this.state[id]) {
      const validStack = {
        cup: []
      }
      if (inHand.type === "milk" && this.state[id].milk.type === "none") {
        validStack["cup"].push("milk");
      }
      if (inHand.type === "pitcher" && inHand.milk.type != "none") {
        validStack["cup"].push("pitcher");
      }
      if (validStack[this.state[id].type].includes(inHand.type)) {
        return "stack";
      }
    } else {
      const validPlace = {
        itemHere: "cup",
      }
      if (inHand.type === validPlace[id]) {
        return "place";
      }
    }
    return "invalid";
  }

  handleStack = (id, inHand) => {
    if (inHand.type === "milk") {
      if (this.state[id].milk.type === "none") {
        this.setState({
          [id]: {...this.state[id], milk: {type: inHand.milkType, status: "cold"}},
          stackHighlight: false
        })
        console.log(`filling cup with ${inHand.milkType} milk...`);
      } else {
        console.log("already has milk");
      }
    } 
    if (inHand.type === "pitcher") {
      if (this.state[id].milk.type === "none") {
        if (inHand.milk.type != "none") {
          this.setState({
            [id]: {...this.state[id], milk: inHand.milk},
            stackHighlight: false
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
        if (this.validate(id, this.props.itemInHand) === "stack") {
          console.log("valid stack");
          this.handleStack(id, this.props.itemInHand);
        } else {
          console.log("invalid stack");
        }
      } else if (this.validate(id, this.props.itemInHand) === "place") {
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

  dispense = () => {
    if (this.state.itemHere != null && this.state.itemHere.brownType === "none") {
      this.setState({
        itemHere: {...this.state.itemHere, brownType: "coffee"}
      })
      console.log("pouring coffee");
    } else if (this.state.itemHere != null && this.state.itemHere.brownType != "none") {
      console.log(`already filled with ${this.state.itemHere.brownType}`);
    } else {
      console.log("no cup here");
    }
  }
  

  render() {
    let itemHere = null;
    let pickupHover = "";
    if (this.state.itemHere != null) {
      if (!this.props.itemInHand) {
        pickupHover = "pickupHover";
      }
      const Tag = components[this.state.itemHere.type];
      itemHere = <Tag cupDisplay={this.state.itemHere} />
    }
    var className = (this.state.dropHighlight) ? 'validDrop ' : "";
    var stackHighlight = (this.state.stackHighlight) ? 'stackHighlight ' : "";
    return (
      <div className="brewer">
        <img className="brewerImg" src={window.location.origin + "/images/brewer.svg"} />
        <div onClick={(e) => this.handleClick("itemHere", e)} className={'brewerTarget ' + className + stackHighlight + pickupHover}>
          {itemHere}
        </div>
        <div onClick={this.dispense}className="dispenseButton">
        </div>
      </div>
    )
  }
}


export default Brewer;
