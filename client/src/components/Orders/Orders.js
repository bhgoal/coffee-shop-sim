import React from "react";
import { Col, Row, Container } from "../Grid";
import "./Orders.css";


const Orders = props => {

  return (
    <div className="orders">
        {props.orders.map(order => {
          let syrup = (order.syrup === "none") ? null : `, add ${order.syrup}`;
          let milk;
          if (order.syrup === "mocha" && order.name === "Mocha") {
            syrup = null;
          }
          if (order.brownType === "coffee") {
            milk = (order.milk.type === "none") ? null : (order.milk.status === "cold") ? `, ${order.milk.type}` : `, ${order.milk.type}, ${order.milk.status}`;
          } else if (order.brownType === "espresso") {
            milk = (order.milk.type === "none") ? null : `, ${order.milk.type}`;
          }
          if (order.milk.type === "two") {
            milk = ", 2% milk";
          }
          if (order.milk.type === "whole") {
            milk = ", whole milk";
          }
          if (order.milk.type === "halfn") {
            milk = ", half and half";
          }

          return (
            <div onClick={() => (
                props.checkOrder(order)
              )} className="singleOrder">
              <div>{order.name}{syrup}{milk}</div>
              
            </div>
          );
        })}
    </div>
  )
};

export default Orders;
