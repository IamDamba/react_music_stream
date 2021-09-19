import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "../pages/views/forgetPassword/ForgetPassword";
import Signin from "../pages/views/signin/Signin";
import Signup from "../pages/views/signup/Signup";

const UserIndex = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/forget-password" component={ForgetPassword} />
      </Switch>
    </Router>
  );
};

export default UserIndex;
