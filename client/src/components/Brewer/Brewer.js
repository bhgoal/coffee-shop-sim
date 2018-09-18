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
    itemHere: null,
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

  validate = (id, type) => {
    if (this.state[id]) {
      const validStack = {
        cup: "pitcher",
        cup: "milk"
      }
      return (type === validStack[this.state[id].type])
    } else {
      const validPlace = {
        itemHere: "cup",
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
        console.log(`filling cup with ${inHand.milkType} milk...`);
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
    let itemHere;
    let pickupHover;
    if (this.state.itemHere != null) {
      if (!this.props.itemInHand) {
        pickupHover = "pickupHover";
      }
      const Tag = components[this.state.itemHere.type];
      itemHere = <Tag cupDisplay={this.state.itemHere} />
    } else {
      pickupHover = "";
      itemHere = null;
    }
    var className = (this.state.dropHighlight) ? 'validDrop' : "";
    return (
      <div className="brewer">
        <img className="brewerImg" src={window.location.origin + "/images/brewer.svg"} />
        <div onClick={(e) => this.handleClick("itemHere", e)} className={'brewerTarget ' + className + pickupHover}>
          {itemHere}
        </div>
        <div onClick={this.dispense}className="dispenseButton">
        </div>
      </div>
    )
  }
}


export default Brewer;
