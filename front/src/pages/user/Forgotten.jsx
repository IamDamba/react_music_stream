import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../styles/main/forgotten/forgotten.scss";

const Forgotten = () => {
  return (
    <main className="forgotten">
      <div className="forgotten_form">
        <div className="return_link">
          <Link to="/signin">
            <FontAwesomeIcon icon={faArrowLeft} /> Return to signin
          </Link>
        </div>
        <h1>Forgot Password</h1>
        <form>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email here"
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

export default Forgotten;
