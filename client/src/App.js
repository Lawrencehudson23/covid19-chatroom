import React from "react";
// import React,{useState,useEffect} from 'react';
import "./App.css";
import { Router, Link } from "@reach/router";
import { BrowserRouter, Route } from "react-router-dom";
// import { Button } from "@material-ui/core";
// import { H1 } from '@material-ui/core';
import CountryList from "./views/CountryList";
import SearchCountryForm from "./components/SearchCountryForm";
import CountryDetail from "./views/CountryDetail";
import Registration from "./views/Registration";
import LogoutButton from "./components/LogoutButton";
import LoginForm from "./views/LoginForm";
// import io from 'socket.io-client';
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <h1>Covid-19 Status</h1>
      <Link to="/world">World</Link>
      {"  "}
      <Link to="/world/USA">USA</Link>
      {"  "}
      <Link to="/world/China">China</Link>
      {"  "}
      <Link to="/world/France">France</Link>
      {"  "}
      <Link to="/world/Italy">Italy</Link>
      {"  "}
      <Link to="/world/Spain">Spain</Link>
      {"  "}
      <Link to="/world/Germany">Germany</Link>
      <SearchCountryForm />
      {/* <Button onClick={() => navigate("/join")}>Chat Room</Button>{" "} */}
      <Link to="/register">
        Registration
      </Link> <Link to="/login">Login</Link> <LogoutButton />
      {/* <Button color="primary">Hello World</Button> */}
      <Router>
        <Registration path="/register" />
        <LoginForm path="/login" />
        <CountryList path="/world" />
        <CountryDetail path="/world/:searchCountry" />
        {/* <Join path="/join" />
        <Chat path="/chat" /> */}
      </Router>
      <BrowserRouter>
        <Route path="/join" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </BrowserRouter>
    </div>
  );
}
export default App;
