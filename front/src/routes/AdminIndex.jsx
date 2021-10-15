import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "../pages/views/Admin/AdminLogin";

const AdminIndex = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/member" component={AdminLogin} />
      </Switch>
    </Router>
  );
}

export default AdminIndex
