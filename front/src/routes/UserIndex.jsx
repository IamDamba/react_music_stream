import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "../pages/views/forgetPassword/ForgetPassword";
import ResetPassword from "../pages/views/resetPassword/ResetPassword.jsx";
import Signin from "../pages/views/signin/Signin";
import Signup from "../pages/views/signup/Signup";
import Toast from "../pages/layouts/Toast";
import Error404 from "../pages/views/error404/Error404";

const UserIndex = () => {
  return (
    <Router>
      <Toast position="bottom-left" />
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/:email/resetpassword" component={ResetPassword} />
        {/*All Other Route*/}
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
};

export default UserIndex;
