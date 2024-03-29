import React, { useEffect, useState } from "react";
import axios from "../axios/index.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "../pages/views/forgetPassword/ForgetPassword";
import ResetPassword from "../pages/views/resetPassword/ResetPassword.jsx";
import Signin from "../pages/views/signin/Signin";
import Signup from "../pages/views/signup/Signup";
import Toast from "../pages/layouts/Toast";
import Error404 from "../pages/views/error404/Error404";
import AdBlockModal from "../pages/layouts/AdBlockModal.jsx";

import { useDetectAdBlock } from "adblock-detect-react";
import { useSelector } from "react-redux";

const UserIndex = () => {
  //hooks
  const [isUser, setIsUser] = useState(false);

  const adBlockDetected = useDetectAdBlock();

  //Redux
  const { token, tokenDuration } = useSelector((state) => state.userReducer);

  const fetchUser = async () => {
    await axios
      .post("/api/currentuser", {
        token: token,
        tokenDuration: tokenDuration,
      })
      .then((res) => {
        if (res.data.isUser !== false) {
          let redirect = document.createElement("a");
          redirect.href = "/profile";
          redirect.click();
          setIsUser(false);
        } else {
          setIsUser(true);
          return;
        }
      })
      .catch((err) => {
        return;
      });
  };

  // Functions
  useEffect(() => {
    fetchUser();
  });

  if (!isUser) {
    return <div></div>;
  } else {
    if (adBlockDetected) {
      return <AdBlockModal />;
    } else {
      return (
        <Router>
          <Toast position="bottom-left" />
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route
              exact
              path="/:email/resetpassword"
              component={ResetPassword}
            />
            {/*All Other Route*/}
            <Route path="*" component={Error404} />
          </Switch>
        </Router>
      );
    }
  }
};

export default UserIndex;
