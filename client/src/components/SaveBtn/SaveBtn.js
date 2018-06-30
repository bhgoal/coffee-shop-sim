import React, { Component } from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

let message = "Save Article";
class SaveBtn extends Component {
  state = {
    message
  };

  handleClick = () => {
    this.setState({ message: "Saved!" });
  }

  render() {
    return (
      <button onClick={() => (
          this.props.handleSaveArticle(this.props.article),
          this.handleClick()
        )} type="button" className="btn btn-sm btn-saveBtn">{this.state.message}</button>
    );
  }
}
export default SaveBtn;
