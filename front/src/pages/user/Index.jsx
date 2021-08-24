import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forgotten from "./Forgotten";
import Signin from "./Signin";
import Signup from "./Signup";

export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgotten" component={Forgotten} />
      </Switch>
    </Router>
  );
};
