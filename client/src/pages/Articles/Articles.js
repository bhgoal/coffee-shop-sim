import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Auth from '../../auth/Auth.js';

const auth = new Auth();


class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadDrinks();
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
      const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

      // Begin building an object to contain our API call's query parameters
      // Set the API key
      let queryParams = `api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=${this.state.topic.trim()}`;

      // If the user provides a startYear, include it in the queryParams
      const startYear = this.state.startYear
        .trim();

      if (parseInt(startYear)) {
        queryParams += `&begin_date=${startYear}0101`;
      }

      // If the user provides an endYear, include it in the queryParams
      const endYear = this.state.endYear
        .trim();

      if (parseInt(endYear)) {
        queryParams += `&end_date=${endYear}0101`;
      }

      // Logging the URL so we have access to it for troubleshooting
      console.log(this.state.topic);
      console.log(baseURL + queryParams);
      const queryURL = baseURL + queryParams;

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

  handleClick = action => {
    API.saveArticle({
      action: action,
    })
      .then(res =>
        this.setState({ 
          articles: res.data
        }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
              <Jumbotron>
                <h1>Coffee Shop Sim!</h1>
              </Jumbotron>
            <Row>
              <Col size="md-6">
                Actions
                <div><button onClick={() => (
                  this.handleClick("Pull shot")
        )} type="button" className="btn btn-sm btn-saveBtn">Pull shot</button></div>
        <div><button onClick={() => (
                  this.handleClick()
        )} type="button" className="btn btn-sm btn-saveBtn">Milk</button></div>
        <div><button onClick={() => (
                  this.handleClick()
        )} type="button" className="btn btn-sm btn-saveBtn">Banana</button></div>
              </Col>
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
            </Row>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Orders</h1>
            </Jumbotron>
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
      </Container>
    );
  }
}

export default Articles;
