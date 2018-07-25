import React from "react";

export const Container = ({ fluid, children }) =>
  <div style={{display: "flex", padding: 0, "width": "80vw", height: "45vw", margin: "0 auto"}}>
    <img style={{"z-index": "-1", position: "absolute", "width": "80vw"}} src={window.location.origin + "/images/bg.svg"} />
    {children}
  </div>;
