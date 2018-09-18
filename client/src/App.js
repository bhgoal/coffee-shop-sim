import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import history from "./history";
import Auth from "./auth/Auth.js";
import Callback from "./pages/Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const App = () =>
  <Router history={history}>
    <div>
      <Nav auth={auth}/>
      <Switch>
        <Route exact path="/" render={(props) => <Game auth={auth} {...props} />} />
        <Route exact path="/articles" render={(props) => <Game auth={auth} {...props} />} />
        <Route exact path="/saved" render={(props) => <Saved auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
