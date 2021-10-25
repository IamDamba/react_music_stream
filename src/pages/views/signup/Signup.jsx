// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/signup/signup.scss";
import React, { useState } from "react";
import warningIcon from "../../../media/toast/warningIcon.svg";
import axios from "axios";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  setTokenToReducer,
  setTokenDurationToReducer,
} from "../../../reducer/slices/userSlice";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  // Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux
  const { toast_list, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  // Functions
  const handleSubmitForm = async (e) => {
    let linkRedirection = document.createElement("a");
    linkRedirection.href = "/";
    e.preventDefault();

    if (confirmPassword === password) {
      await axios
        .post("https://music-stream-serverside.herokuapp.com/api/signup", {
          email: email,
          password: password,
          username: username,
        })
        .then((res) => {
          dispatch(setTokenToReducer(res.data.token));
          dispatch(setTokenDurationToReducer(res.data.tokenDuration));
          linkRedirection.click();
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
    } else {
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description: "Password don't match.",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
    }
  };

  return (
    <main className="signup">
      <div className="signup_form">
        <div className="return_link">
          <a href="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to home
          </a>
        </div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmitForm.bind(this)}>
          <div className="input">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username"></label>
          </div>
          <div className="input email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email"></label>
          </div>
          <div className="input password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password"></label>
          </div>
          <div className="input password">
            <input
              type="password"
              name="conf_password"
              id="conf_password"
              placeholder="Enter confirm password here"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="conf_password"></label>
          </div>
          <div className="other_button">
            <div className="send_button">
              <button type="submit">Sign Up</button>
            </div>
            <label>
              Already have an account ? <Link to="/signin">Sign in here</Link>
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

export default Signup;
