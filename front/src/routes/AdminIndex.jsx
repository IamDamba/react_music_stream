import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "../pages/views/Admin/AdminLogin";
import AdminDashboard from "../pages/views/Admin/AdminDashboard";
import Error404 from "../pages/views/error404/Error404";
import { useSelector } from "react-redux";
import Toast from "../pages/layouts/Toast";

const AdminIndex = () => {
  //Redux
  const { member_token } = useSelector((state) => state.memberReducer);

  return (
    <Router>
      <Toast position={"bottom-left"} />
      <Switch>
        <Route exact path="/member/signin" component={AdminLogin} />
        {member_token !== null ? (
          <Route
            exact
            path="/member/log/dashboard"
            component={AdminDashboard}
          />
        ) : (
          <Route exact path="/member/log/dashboard" component={Error404} />
        )}
      </Switch>
    </Router>
  );
};

export default AdminIndex;
