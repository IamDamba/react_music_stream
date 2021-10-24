// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/admin/adminlogin.scss";
import React, { useState } from "react";
import warningIcon from "../../../media/toast/warningIcon.svg";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  setMemberTokenToReducer,
  setMemberTokenDurationToReducer,
} from "../../../reducer/slices/memberSlice";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminLogin = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // redux
  const { toast_list, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const { member_token, member_tokenDuration } = useSelector(
    (state) => state.memberReducer
  );
  const dispatch = useDispatch();

  // Functions
  const handleSignin = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/member/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        let redirect = document.createElement("a");
        redirect.href = "/member/log/dashboard";

        dispatch(setMemberTokenToReducer(res.data.token));
        dispatch(setMemberTokenDurationToReducer(res.data.tokenDuration));
        redirect.click();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        let toast_item = {
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
    <main className="adminlogin">
      <div className="adminlogin_form">
        <div className="return_link">
          <a href="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to home
          </a>
        </div>
        <h1>Member Space</h1>
        <form onSubmit={(e) => handleSignin(e)}>
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

export default AdminLogin;
