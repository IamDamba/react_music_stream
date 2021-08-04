import "../styles/main/about/about.scss";
import React from "react";
import Img from "../media/aboutImage.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
  window.scrollTo(0, 0);

  return (
    <main className="about">
      <div className="content">
        <div className="content_header">
          <h1>About Us</h1>
          <h2>here is all our precious Producer and short story about us</h2>
        </div>
        <section className="about_info">
          <div className="about_info_first">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="about_info_second">
            <div className="list">
              <div className="item">
                <div className="img">
                  <img src={Img} alt="" />
                  <div className="filter">
                    <a href="https://instagram.com" target="_blank">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://facebook.com" target="_blank">
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                  </div>
                </div>
                <div className="detail">
                  <p>Producer Name</p>
                  <p>Beatmaker</p>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <img src={Img} alt="" />
                  <div className="filter">
                    <a href="https://instagram.com" target="_blank">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://facebook.com" target="_blank">
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                  </div>
                </div>
                <div className="detail">
                  <p>Producer Name</p>
                  <p>Beatmaker</p>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <img src={Img} alt="" />
                  <div className="filter">
                    <a href="https://instagram.com" target="_blank">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://facebook.com" target="_blank">
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                  </div>
                </div>
                <div className="detail">
                  <p>Producer Name</p>
                  <p>Beatmaker</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
