import React, { Component } from "react";
import "./Trash.css";

class Trash extends Component {

  handleTrash = () => {
    if (this.props.itemInHand.type === "cup") {
      this.props.emptyHand();
    } else if (this.props.itemInHand.type === "pitcher") {
      this.props.changeInHand({type: "pitcher", id: 0, milk: {type: "none", status: "none"}});
    } else {
      console.log("can't throw away this type");
    }
  }

  render() {
    var hover = (this.props.itemInHand) ? "pickupHover" : "";
    return (
      <div className={"trash " + hover} onClick={this.handleTrash}>
      </div>
    )
  }
};

export default Trash;
