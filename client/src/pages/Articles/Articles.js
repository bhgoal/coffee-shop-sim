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

const auth = new Auth();


class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    cupInHand: false
  };
  
  componentDidMount() {
    this.loadDrinks();
  }

  handleCupClick = () => {
    if (this.state.cupInHand === false) {
      this.setState({
        cupInHand: true
      });
      document.body.style.cursor = "url(images/coffeeCup.svg) 52 63, auto";
    } else {
      this.setState({
        cupInHand: false
      });
      document.body.style.cursor = "initial";
    }
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
                  cupInHand={this.state.cupInHand}
                  handleCupClick={this.handleCupClick}
                ></Brewer>
              </Col>
              <Col size="md-2">
                <Syrups
                  cupInHand={this.state.cupInHand}
                  handleCupClick={this.handleCupClick}
                ><Cup></Cup></Syrups>
              </Col>
              <Col size="md-5">
                <Espresso></Espresso>
              </Col>
              <Col size="md-3">
                <Counter></Counter>
              </Col>
            </Row>
            <Row>
              <Col size="md-6">
                <Storage></Storage>
              </Col>
              <Col size="md-3">
                <Fridge></Fridge>
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

export default Articles;
