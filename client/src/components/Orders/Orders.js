import React from "react";
import "./Orders.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Orders = props => (
  <span className="orders" {...props}>
    Orders
  </span>
);

export default Orders;
