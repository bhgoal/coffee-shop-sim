import React from "react";
import "./Nav.css";



const Nav = props => (

  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">Coffee Shop Sim!</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Saved</a>
        </li>
        <li className="nav-item">
          {
            props.auth.isAuthenticated() ?
              (<a className="nav-link" href="/" onClick={(event) => (event.preventDefault(), props.auth.logout())}>Log out</a>)
            :
              (<a className="nav-link" href="/" onClick={(event) => (event.preventDefault(), props.auth.login())}>Log in</a>)
          }
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
