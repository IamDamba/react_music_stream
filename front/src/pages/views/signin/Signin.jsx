// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/signin/signin.scss";
import React, { useState } from "react";
import warningIcon from "../../../media/toast/warningIcon.svg";
import axios from "axios";

import { Link } from "react-router-dom";
import {
  setTokenToReducer,
  setTokenDurationToReducer,
} from "../../../reducer/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // redux
  const { toast_list, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  // Functions
  const handleSignin = async (e) => {
    let a = document.createElement("a");
    a.href = "/";

    e.preventDefault();
    await axios
      .post("/api/signin", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        dispatch(setTokenToReducer(res.data.token));
        dispatch(setTokenDurationToReducer(res.data.tokenDuration));
        a.click();
      })
      .catch((err) => {
        const toast_item = {
          id: toast_list.length + 1,
          title: "Warning",
          description: err.response.data.message,
          backgroundColor: warning_color,
          icon: warningIcon,
        };

        dispatch(setToastItemToReducer(toast_item));
      });
  };

  return (
    <main className="signin">
      <div className="signin_form">
        <div className="return_link">
          <a href="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to home
          </a>
        </div>
        <h1>Sign In</h1>
        <form onSubmit={handleSignin.bind(this)}>
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email"></label>
          </div>
          <div className="input password">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password"></label>
            <div className="checkbox">
              <label>
                Show Password ?{" "}
                <input
                  type="checkbox"
                  name="check_password"
                  id="check_password"
                  value={isPasswordVisible}
                  onChange={() =>
                    setIsPasswordVisible(isPasswordVisible ? false : true)
                  }
                />
              </label>
            </div>
          </div>
          <div className="other_button">
            <div className="send_button">
              <button type="submit">Sign in</button>
            </div>
            <label>
              Doesn't have an account ? <Link to="/signup">Sign up here</Link>
            </label>
            <label>
              <Link to="/forget-password">Forgotten password ? </Link>
            </label>
          </div>
        </form>
      </div>
      <div className="banner">
        <div className="img"></div>
        <div className="filter"></div>
      </div>
    </main>
  );
};

export default Signin;
