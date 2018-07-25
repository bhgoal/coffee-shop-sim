import React from "react";

export const Row = ({ fluid, children }) =>
  <div className={`row${fluid ? "-fluid" : ""} no-gutters`}>
    {children}
  </div>;
