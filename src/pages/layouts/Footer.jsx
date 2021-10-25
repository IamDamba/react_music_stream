// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../styles/footer/footer.scss";
import React, { useState } from "react";
import axios from "axios";
import Logo from "../../media/logo/logo.svg";
import warningIcon from "../../media/toast/warningIcon.svg";
import errorIcon from "../../media/toast/errorIcon.svg";
import checkIcon from "../../media/toast/checkIcon.svg";

import { Link, useHistory } from "react-router-dom";
import { emailPattern } from "../../components/regex/Regex";
import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Footer |||||||||||||||||||||||||

const Footer = () => {
  //Hooks
  const [email, setEmail] = useState("");
  const history = useHistory();

  //Redux
  const { toast_list, warning_color, error_color, check_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  //Functions
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(email);

    if (!email.match(emailPattern) === true) {
      console.log("fail");
      const toast_item = {
        id: toast_list.length + 1,
        title: "Warning",
        description: "Email is not valid.",
        backgroundColor: warning_color,
        icon: warningIcon,
      };

      dispatch(setToastItemToReducer(toast_item));
      console.log("Error in email");
      return;
    } else {
      await axios
        .post("https://music-stream-serverside.herokuapp.com/api/newsletter", {
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

          setEmail("");
          history.push("/newsletter");
        })
        .catch((err) => {
          console.log("here");
          const toast_item = {
            id: toast_list.length + 1,
            title: "Error",
            description: err.response.data.message,
            backgroundColor: error_color,
            icon: errorIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
        });
    }
  };

  return (
    <footer>
      <div className="newsletter">
        <div className="newsletter_head">
          <h2>Subcribe to our Newsletter</h2>
          <h3>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor elitr, sed diam nonumy eirmod tempor.
          </h3>
        </div>
        <form className="newsletter_body">
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email here"
            />
          </div>
          <div className="button">
            <button type="submit" onClick={handleForm.bind(this)}>
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className="bottom">
        <div className="bottom_first">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="list">
            <div className="legal">
              <h2>Legal</h2>
              <ul>
                <li>
                  <Link to="/terms">Terms & Condition</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/licences">Licencing Methods</Link>
                </li>
              </ul>
            </div>
            <div className="social_media">
              <h2>Social Media</h2>
              <ul>
                <li>
                  <a href="https://facebook.com" target="_blank">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom_second">
          <p>
            © Copyright. Music Stream 2021. All Right Reserved.{" "}
            <a href="https://iamdamba-v2-1.herokuapp.com" target="_blank">
              By IamDamba
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
