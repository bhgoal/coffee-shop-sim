import React from "react";
import { Col, Row, Container } from "../Grid";
import "./Orders.css";


const Orders = props => {

  return (
    <div className="orders">
        {props.orders.map(order => (
          <div>{order.name}, {order.brownType}</div>
        ))}
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
