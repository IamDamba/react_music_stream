// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "./styles/index/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";

import store from "./reducer/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserIndex from "./routes/UserIndex";

// ||||||||||||||||||||||| Functions |||||||||||||||||||||||||

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* App Router */}
        <Route exact path="/" component={App} />
        <Route exact path="/tracks" component={App} />
        <Route exact path="/track/detail/:track_id" component={App} />
        <Route exact path="/about" component={App} />
        <Route exact path="/contact" component={App} />
        <Route exact path="/newsletter" component={App} />
        <Route exact path="/cart" component={App} />
        <Route exact path="/licences" component={App} />
        <Route exact path="/terms" component={App} />
        <Route exact path="/privacy" component={App} />
        <Route exact path="/profile" component={App} />

        {/* User Router */}
        <Route exact path="/signin" component={UserIndex} />
        <Route exact path="/signup" component={UserIndex} />
        <Route exact path="/forgotten" component={UserIndex} />

        {/* All Other Route
          <Route path="*" component={Error404} /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
