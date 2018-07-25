import React from "react";
import { Col, Row, Container } from "../Grid";
import SaveBtn from "../SaveBtn";
import "./Orders.css";


const Orders = props => {
  props.orders.map(order => {
    const syrup = (order.syrup === "none") ? null : order.syrup;
    
  })

  return (
    <div className="orders">
        {props.orders.map(order => {
          const syrup = (order.syrup === "none") ? null : `, add ${order.syrup}`;
          let milk;
          if (order.brownType === "coffee") {
            milk = (order.milk.type === "none") ? null : (order.milk.status === "cold") ? `, ${order.milk.type}` : `, ${order.milk.type}, ${order.milk.status}`;
          } else if (order.brownType === "espresso") {
            milk = (order.milk.type === "none") ? null : `, ${order.milk.type}`;
          }

          return (
            <div>
              <div>{order.name}{syrup}{milk}</div>
              <SaveBtn order={order} checkOrder={props.checkOrder} />
            </div>
          );
        })}
          {/* {this.state.articles.slice(0, 5).map(article => (
          <ListItem key={article._id}>
            <SaveBtn handleSaveArticle={this.handleSaveArticle} article={article} />
            <span>
                {article.headline.main}
            </span><br/>
            Published on {article.pub_date}<br/>
            <Link to={article.web_url}>
              <strong>
                {article.web_url}
              </strong>
            </Link>
          </ListItem>
        ))} */}
    </div>
  )
};

export default Orders;
