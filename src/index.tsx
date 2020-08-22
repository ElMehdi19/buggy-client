import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Router>
    <Switch>
      <Provider store={store}>
        <App />
      </Provider>
    </Switch>
  </Router>,
  document.getElementById("root")
);
