import "./styles/index/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Error404 from "./pages/error/Error404.jsx";
import UserContextProvider from "./contexts/UserContext";

import { CookiesProvider } from "react-cookie";
import { Index as UserIndex } from "./pages/user/Index";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <UserContextProvider>
      <Router>
        <Switch>
          {/* App Router */}
          <Route exact path="/" component={App} />
          <Route exact path="/tracks" component={App} />
          <Route exact path="/about" component={App} />
          <Route exact path="/contact" component={App} />
          <Route exact path="/cart" component={App} />
          <Route exact path="/licences" component={App} />
          <Route exact path="/terms" component={App} />
          <Route exact path="/privacy" component={App} />
          <Route exact path="/profile" component={App} />
          <Route exact path="/track/detail/:track_id" component={App} />

          {/* User Router */}
          <Route exact path="/signin" component={UserIndex} />
          <Route exact path="/signup" component={UserIndex} />
          <Route exact path="/forgotten" component={UserIndex} />

          {/* All Other Route */}
          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </UserContextProvider>
  </Provider>,
  document.getElementById("root")
);
