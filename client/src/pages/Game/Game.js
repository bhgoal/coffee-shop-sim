import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Brewer from "../../components/Brewer";
import Counter from "../../components/Counter";
import Espresso from "../../components/Espresso";
import Fridge from "../../components/Fridge";
import Ice from "../../components/Ice";
import Orders from "../../components/Orders";
import SteamWand from "../../components/SteamWand";
import Storage from "../../components/Storage";
import Syrups from "../../components/Syrups";
import Cup from "../../components/Cup";
import Auth from '../../auth/Auth.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const auth = new Auth();


class Game extends Component {
  state = {
    orders: [],
    topic: "",
    startYear: "",
    endYear: "",
    itemInHand: null
  };
  
  componentDidMount() {
    //this.loadDrinks();
    this.generateOrder();
    console.log(this.state.orders);
  }

  generateOrder = () => {

    const selection = {
      brownType: ["coffee", "espresso"],
      syrup: ["vanilla", "caramel", "mocha"],
      milk: {
        type: ["2%", "whole", "half and half"],
        status: ["cold", "steamed", "foamed"]
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
    //      status: foamed
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
        milk.status = getRandom({foamed: 0.3, steamed: 0.7});
        syrup = getRandom(syrupChances);
        if (milk.status = "foamed") {
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
      name: name,
      brownType: brownType,
      syrup: syrup,
      milk: milk
    }
    console.log(newOrder);
    this.setState({ orders: [...this.state.orders, newOrder] }) ;
    
      // itemHere: {type: "cup", id: 0, brownType: "none", milk: {type: "none", status: "none"}, syrup: "none"}
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
    let image;
    let offset;
    if (item) {
      if (item.type === "cup") {
        if (item.brownType === "none") {
          image = "coffeeCup.svg";
          
        } else {
          image = "coffeeCupFilled.svg";
        }
        offset = "52 63";
      } else if (item.type === "milk") {
        image = "milk.svg";
        offset = "50 50";
      } else if (item.type === "pitcher") {
        image = "pitcher.svg";
        offset = "45 50";
      }
      document.body.style.cursor = `url(/images/${image}) ${offset}, auto`;
    } else {
      document.body.style.cursor = "initial";
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
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            <Orders orders={this.state.orders} />
          </Col>
          <Col size="md-9">
            <Row>
              <Col size="md-2">
                <Brewer 
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Brewer>
              </Col>
              <Col size="md-2">
                <Syrups
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Syrups>
              </Col>
              <Col size="md-5">
                <Espresso
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Espresso>
              </Col>
              <Col size="md-3">
                <Counter
                  itemInHand={this.state.itemInHand}
                  changeInHand={this.changeInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Counter>
              </Col>
            </Row>
            <Row>
              <Col size="md-6">
                <Storage
                  itemInHand={this.state.itemInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Storage>
              </Col>
              <Col size="md-3">
                <Fridge
                  itemInHand={this.state.itemInHand}
                  handleItemPickup={this.handleItemPickup}
                ></Fridge>
              </Col>
              <Col size="md-3">
                <Ice></Ice>
              </Col>
            </Row>
          </Col>
        </Row>
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