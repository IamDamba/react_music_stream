import "../../../styles/main/resetpassword/resetpassword.scss";
import React, { useState } from "react";
import checkIcon from "../../../media/toast/checkIcon.svg";
import warningIcon from "../../../media/toast/warningIcon.svg";
import axios from "../../../axios/index.js";

import {
  emailPattern,
  namePattern,
  messagePattern,
} from "../../../components/regex/Regex";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useParams();

  //redux
  const { toast_list, check_color, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  const handleValidPassword = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      await axios
        .post("/api/resetpassword", {
          email: email,
          password: password,
        })
        .then((res) => {
          let a = document.createElement("a");
          const toast_item = {
            id: toast_list.length + 1,
            title: "Success",
            description: res.data.message,
            backgroundColor: check_color,
            icon: checkIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          a.href = "/";
          setTimeout(() => a.click(), 3000);
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
    <main className="reset_password">
      <div className="reset_password_form">
        <div className="return_link">
          <Link to="/signin">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to signin
          </Link>
        </div>
        <h1>Reset Password</h1>
        <form onSubmit={handleValidPassword.bind(this)}>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password here"
              required
            />
          </div>
          <div className="input">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Please Confirm Password here"
              required
            />
          </div>
          <div className="other_button">
            <div className="send_button">
              <button type="submit">Valid Password</button>
            </div>
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

export default ResetPassword;
