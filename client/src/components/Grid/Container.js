import React from "react";

export const Container = props =>
  <div onMouseMove={props.mouseMove} style={{display: "flex", padding: 0, "width": "1152px", height: "648px", margin: "0 auto"}}>
    <img style={{zIndex: "-1", position: "absolute", "width": "1152px"}} src={window.location.origin + "/images/bg.svg"} />
    {props.children}
  </div>;


// width 80vw height 45vw