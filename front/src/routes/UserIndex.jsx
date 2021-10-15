import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "../pages/views/forgetPassword/ForgetPassword";
import Signin from "../pages/views/signin/Signin";
import Signup from "../pages/views/signup/Signup";

const UserIndex = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forget-password" component={ForgetPassword} />
      </Switch>
    </Router>
  );
};

export default UserIndex;
