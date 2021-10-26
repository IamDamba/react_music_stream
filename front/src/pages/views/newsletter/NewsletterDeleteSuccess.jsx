// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/newsletter/newsletter_delete_success.scss";
import React, { useEffect } from "react";
import checkIcon from "../../../media/toast/checkIcon.svg";

import { Link } from "react-router-dom";
import { setToastItemToReducer } from "../../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
// ||||||||||||||||||||||| Newsletter |||||||||||||||||||||||||

const NewsletterDeleteSuccess = () => {
  window.scrollTo(0, 0);

  //functions
  return (
    <main className="newsletter_delete_success">
      <div className="content">
        <h1>You successully unsubscribe from our newsletter</h1>
        <p>
          You can now return to <Link to="/">home page here.</Link>
        </p>
      </div>
    </main>
  );
};

export default NewsletterDeleteSuccess;
