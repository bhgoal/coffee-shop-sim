import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Brewer from "../../components/Brewer";
import Counter from "../../components/Counter";
import Espresso from "../../components/Espresso";
import Fridge from "../../components/Fridge";
import Trash from "../../components/Trash";
import Orders from "../../components/Orders";
import Cursor from "../../components/Cursor";
import Storage from "../../components/Storage";
import Syrups from "../../components/Syrups";
import Cup from "../../components/Cup";
import Auth from '../../auth/Auth.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const auth = new Auth();
let userId;


class Game extends Component {
  state = {
    orders: [],
    orderNum: 0,
    itemInHand: null,
    userData: null,
    currentScore: 0,
    timeRemaining: 60,
    cursorMove: false,
    mouseX: 0,
    mouseY: 0
  };
  
  componentDidMount() {
    //this.loadDrinks();
    //this.generateOrder();
    //console.log(this.state.orders);
    this.checkLogin();
    //setTimeout(this.getUserData, 2000);
  }

  checkLogin = () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    } else {
      auth.auth0.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          console.log(profile);
          API.saveArticle({
            userId: profile.sub
          }).catch(err => console.log(err));
          userId = profile.sub;
          console.log(userId);
        }
      });
      setTimeout(this.getUserData, 2000);
    }
  }

  getUserData = () => {
    API.getArticle(userId).then(res => {
      this.setState({ 
        userData: res.data
      });
      console.log(this.state.userData);
    });
  }

  componentDidUpdate() {
    if (this.state.orders.length > 5 || this.state.timeRemaining < 1) {
      this.gameOver();
    }
  }

  gameOver = () => {
    this.stopOrders();
    if (auth.isAuthenticated) {
      if (!this.state.userData.highScore) {
        API.saveArticle({
          highScore: this.state.currentScore
        }).catch(err => console.log(err));
      } else if (this.state.currentScore > this.state.userData.highScore) {
        console.log(this.state.currentScore);
        API.updateArticle({
          userId: this.state.userData.userId,
          highScore: this.state.currentScore
        }).catch(err => console.log(err));
        this.getUserData();
      }
    }
  }

  startOrders = () => {
    this.generateOrder();
    this.interval = setInterval(this.generateOrder, 10000);
    this.timer = setInterval(this.tick, 1000);
  }

  tick = () => {
    this.setState({timeRemaining: this.state.timeRemaining - 1});
  }

  stopOrders = () => {
    clearInterval(this.interval);
    clearInterval(this.timer);
  }

  generateOrder = () => {

    const selection = {
      brownType: ["coffee", "espresso"],
      syrup: ["vanilla", "caramel", "mocha"],
      milk: {
        type: ["2%", "whole", "half and half"],
        status: ["cold", "steamed", "frothed"]
      }
    };

    // getRandom chooses a random result from a series of items with different probabilities. It accepts objects as input, with the desired items as property names and the probabilities (as decimals) as property values

    const getRandom = (input) => {
        const num = Math.random();
        let s = 0;
        for (let i in input) {
          s += input[i];
          if (num < s) {
            return i;
          }
        }
    };

    // possibleDrinks = {
    //   coffee: {
    //     syrup: any,
    //     milk: {
    //      type: any, 
    //      status: steamed, most common cold
    //     }
    //   },
    //   espresso: {
    //     syrup: any, most common none
    //     milk: none
    //   }
    //   cappuccino: {
    //     syrup: any
    //     milk: {
    //      type: 2% or whole, 
    //      status: frothed
    //     }
    //   }
    //   mocha: {
    //     syrup: mocha
    //     milk: {
    //      type: 2% or whole, 
    //      status: steamed
    //     }
    //   }
    //   latte: {
    //     syrup: none, vanilla or caramel
    //     milk: {
    //      type: 2% or whole, 
    //      status: steamed
    //     }
    //   }
    // }
    const syrupChances = {none: 0.25, vanilla: 0.25, caramel: 0.25, mocha: 0.25};
    const brownType = getRandom({coffee: 0.25, espresso: 0.75});

    let name;
    let syrup;
    let milk = {
      type: "",
      status: ""
    };
   

    if (brownType === "coffee") {
      name = "Coffee";
      syrup = getRandom(syrupChances);
      milk.type = getRandom({none: 0.2, halfn: 0.6, whole: 0.1, two: 0.1});
      if (milk.type === "whole" || milk.type === "two") {
        milk.status = getRandom({cold: 0.8, steamed: 0.2});
      } else if (milk.type === "halfn") {
        milk.status = "cold";
      } else if (milk.type === "none") {
        milk.status = "none";
      }
    } else if (brownType === "espresso") {
      milk.type = getRandom({none: 0.25, whole: 0.4, two: 0.35});
      if (milk.type === "whole" || milk.type === "two") {
        milk.status = getRandom({frothed: 0.3, steamed: 0.7});
        syrup = getRandom(syrupChances);
        if (milk.status === "frothed") {
          name = "Cappuccino";
        } else if (syrup === "mocha") {
          name = "Mocha";
        } else {
          name = "Latte";
        }
      } else if (milk.type === "none") {
        name = "Espresso";
        milk.status = "none";
        syrup = getRandom({none: 0.7, vanilla: 0.1, caramel: 0.1, mocha: 0.1});
      }
    }

    const newOrder = {
      orderNum: this.state.orderNum,
      name: name,
      brownType: brownType,
      syrup: syrup,
      milk: milk
    }
    console.log(newOrder);
    this.setState({ orders: [...this.state.orders, newOrder] }) ;
    this.setState({
      orderNum: this.state.orderNum + 1
    }); 
    
      // itemHere: {type: "cup", id: 0, brownType: "none", milk: {type: "none", status: "none"}, syrup: "none"}
  }

  checkOrder = (ticket) => {
    const currentOrders = this.state.orders;
    const orderOut = this.state.itemInHand;
    console.log(orderOut);
    console.log(ticket);
    if (!orderOut) {
      console.log("no drink in hand");
    } else if (orderOut.brownType === ticket.brownType && orderOut.syrup === ticket.syrup && orderOut.milk.type === ticket.milk.type && orderOut.milk.status === ticket.milk.status) {
      console.log("order good");
      currentOrders.splice([currentOrders.findIndex(order => order.orderNum === ticket.orderNum)], 1);
      this.emptyHand();
      this.setState({
        currentScore: this.state.currentScore + 1
      });
    } else {
      console.log("order no good");
    }
  }

  emptyHand = () => {
    this.setState({
      itemInHand: null
    });
    this.handleCursorChange(null);
  }

  handleItemPickup = (item) => {
    if (this.state.itemInHand === null) {
      this.setState({
        itemInHand: item
      });
    } else {
      this.setState({
        itemInHand: null
      });
    }
    this.handleCursorChange(item);
  }

  handleCursorChange = (item) => {

    if (item) {
      console.log("move cursor");
      this.setState({cursorMove: true});
    } else {
      this.setState({cursorMove: false});
    }

  }

  changeInHand = (updated) => {
    this.setState({
      itemInHand: updated
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear) {

      API.saveArticle({
        name: this.state.topic,
        ingredients: this.state.startYear
      })
        .then(this.loadDrinks())
        .catch(err => console.log(err));
    }
  };

  loadDrinks = () => {
    API.getArticles().then(res =>
      this.setState({ 
        orders: res.data
      }))
  }

  render() {

    const styleScore = {
      float: "right",
      background: "rgba(255, 255, 255, 0.93)",
      borderRadius: "5px",
      padding: "2%",
      margin: "5px 6%",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0 0 1px 2px white",
      width: "50%",
      textAlign: "center"
    }

    const styleButton = {
      background: "rgba(255, 255, 255, 0.93)",
      borderRadius: "5px",
      padding: "2%",
      margin: "5px 6%",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0 0 1px 2px white"
    }

    return (
      <Container mouseMove={(e) => {this.setState({mouseX: (e.clientX - 450), mouseY: (e.clientY - 90)}); }}>
          <div style={{width: "24%", minHeight: "100%"}}>
            <div style={styleScore}>Time Left: {this.state.timeRemaining}</div>
            <button style={styleButton} onClick={this.startOrders}>Start</button>
            {/* <button onClick={this.stopOrders}>Stop</button> */}
            <div style={styleScore}>Current Score: {this.state.currentScore}</div>
            <div style={styleScore}>High Score: {this.state.userData ? this.state.userData.highScore : "..."}</div>
            <Orders orders={this.state.orders} checkOrder={this.checkOrder} generateOrder={this.generateOrder}/>
          </div>
          <div style={{width: "76%", height: "100%"}}>
            <div style={{position: "relative", width: "100%", "height": "51.2%"}}>
                <Cursor 
                  cursorMove={this.state.cursorMove}
                  itemInHand={this.state.itemInHand}
                  mouseX={this.state.mouseX}
                  mouseY={this.state.mouseY}
                />
                <Brewer 
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Brewer>


                <Syrups
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Syrups>

                <Espresso
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Espresso>

                <Counter
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Counter>

            </div>
            <div style={{position: "relative", width: "100%", "height": "48.8%"}}>
                <Storage
                  itemInHand={this.state.itemInHand}
                  handleItemPickup={this.handleItemPickup}
                  emptyHand={this.emptyHand}
                ></Storage>
                <Fridge
                  itemInHand={this.state.itemInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Fridge>
                <Trash
                  emptyHand={this.emptyHand}></Trash>
            </div>
          </div>

      </Container>
    );
  }
}

export default Game;

{/* <Jumbotron>
              <h1>Orders</h1>
            </Jumbotron>
            <Row>
              <Col size="md-6">
                Drink
                <form>
                  <Input
                    value={this.state.topic}
                    onChange={this.handleInputChange}
                    name="topic"
                    placeholder="Name (required)"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    placeholder="Ingredients (required)"
                  />
                  <FormBtn
                    disabled={!(this.state.topic && this.state.startYear)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Order
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6">
                {this.state.orders.length ? (
                  <List>
                    {this.state.orders.map(order => (
                      <div>{order.name}, {order.ingredients}</div>
                    ))}
                     {this.state.articles.slice(0, 5).map(article => (
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
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row> */}