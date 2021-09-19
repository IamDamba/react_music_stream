import React from "react";
import "../../styles/footer/footer.scss";
import Logo from "../../media/logo/logo.svg";

import { Link, withRouter, useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  const handleForm = (e) => {
    e.preventDefault();
    history.push("/newsletter");
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
            <input type="email" name="email" id="email" />
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
            <a href="#" target="_blank">
              By IamDamba
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
