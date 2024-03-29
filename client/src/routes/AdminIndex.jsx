import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "../pages/views/Admin/AdminLogin";
import AdminDashboard from "../pages/views/Admin/AdminDashboard";
import Error404 from "../pages/views/error404/Error404";
import Toast from "../pages/layouts/Toast";
import AdBlockModal from "../pages/layouts/AdBlockModal.jsx";

import { useSelector, useDispatch } from "react-redux";
import { resetMemberFromReducer } from "../reducer/slices/memberSlice";
import { useDetectAdBlock } from "adblock-detect-react";

const AdminIndex = () => {
  //hooks
  const adBlockDetected = useDetectAdBlock();

  //Redux
  const { member_token, member_tokenDuration } = useSelector(
    (state) => state.memberReducer
  );
  const dispatch = useDispatch();

  // Functions

  useEffect(() => {
    if (member_tokenDuration !== null) {
      const interval = setInterval(() => {
        if (member_tokenDuration < Date.now()) {
          dispatch(resetMemberFromReducer());
          window.location.reload();
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  if (adBlockDetected) {
    return <AdBlockModal />;
  } else {
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
  }
};

export default AdminIndex;
