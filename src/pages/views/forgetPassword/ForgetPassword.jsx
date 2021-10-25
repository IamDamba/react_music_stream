// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/forgotten/forgotten.scss";
import React, { useState } from "react";
import checkIcon from "../../../media/toast/checkIcon.svg";
import warningIcon from "../../../media/toast/warningIcon.svg";
import axios from "axios";

import {
  emailPattern,
  namePattern,
  messagePattern,
} from "../../../components/regex/Regex";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Forget Password |||||||||||||||||||||||||

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  //redux
  const { toast_list, check_color, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!email.match(emailPattern) === true) {
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description: "Email is not correct.",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
    } else {
      await axios
        .post("https://music-stream-serverside.herokuapp.com/api/forgottenpassword", {
          email: email,
        })
        .then((res) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Success",
            description: res.data.message,
            backgroundColor: check_color,
            icon: checkIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          console.log(res.data.link);
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
    }
  };

  return (
    <main className="forgotten">
      <div className="forgotten_form">
        <div className="return_link">
          <Link to="/signin">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to signin
          </Link>
        </div>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSendEmail.bind(this)}>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email here"
              required
            />
          </div>
          <div className="other_button">
            <div className="send_button">
              <button type="submit">Reset Password</button>
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

export default ForgetPassword;
