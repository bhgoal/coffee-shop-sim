import React, { Component } from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

let message = "Order Out";
class SaveBtn extends Component {
  state = {
    message
  };

  handleClick = () => {
    this.setState({ message: "Finished!" });
  }

  render() {
    return (
      <button onClick={() => (
          this.props.checkOrder(this.props.order),
          this.handleClick()
        )} type="button" className="btn btn-sm btn-saveBtn">{this.state.message}</button>
    );
  }
}
export default SaveBtn;
