import "../../styles/main/signin/signin.scss";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../slices/userSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordFieldRef = useRef(null);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    const e = passwordFieldRef.current;
    if (e.type === "password") {
      e.type = "text";
    } else {
      e.type = "password";
    }
  };
  const handleSignIn = async (e) => {
    let linkRedirection = document.createElement("a");
    linkRedirection.href = "/";
    e.preventDefault();

    await axios
      .post("/api/signin", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        console.log(res.data.message);
        dispatch(setUserToken(res.data.token));
        linkRedirection.click();
      })
      .catch((err) => {
        console.log(err.message);
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
        <form onSubmit={handleSignIn.bind(this)}>
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
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              ref={passwordFieldRef}
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
                  onClick={handleShowPassword}
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
              <Link to="/forgotten">Forgotten password ? </Link>
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
