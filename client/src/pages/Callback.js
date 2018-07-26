import React, { Component } from 'react';
//import loading from './loading.svg';

class Callback extends Component {
  render() {
    console.log("callback");
    return (
      <div>
        {/* <img src={loading} alt="loading"/> */}
        Loading...
      </div>
    );
  }
}

export default Callback;