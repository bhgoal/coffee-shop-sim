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


class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    itemInHand: null
  };
  
  componentDidMount() {
    this.loadDrinks();
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
        articles: res.data
      }))
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            <Jumbotron>
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
                {this.state.articles.length ? (
                  <List>
                    {this.state.articles.map(article => (
                      <div>{article.name}, {article.ingredients}</div>
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
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
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
                ><Cup></Cup></Syrups>
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

export default DragDropContext(HTML5Backend)(Articles);