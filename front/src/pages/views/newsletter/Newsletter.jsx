// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/newsletter/newsletter.scss";
import React, { useEffect } from "react";
import checkIcon from "../../../media/toast/checkIcon.svg";

import { Link } from "react-router-dom";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
// ||||||||||||||||||||||| Newsletter |||||||||||||||||||||||||

const Newsletter = () => {
  window.scrollTo(0, 0);

  //functions
  return (
    <main className="newsletter">
      <div className="content">
        <h1>Thanks you to register to our newsletter</h1>
        <p>
          You can now return to <Link to="/">home page here.</Link>
        </p>
      </div>
    </main>
  );
};

export default Newsletter;
