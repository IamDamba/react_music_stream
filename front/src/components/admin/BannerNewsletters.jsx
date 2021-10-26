// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useRef } from "react";
import axios from "../../axios/index.js";
import NewslettersPaginatedForm from "./pagination/newsletter/NewslettersPaginatedForm";
import checkIcon from "../../media/toast/checkIcon.svg";
import warningIcon from "../../media/toast/warningIcon.svg";

import { messagePattern } from "../regex/Regex";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSearchNewslettersFromReducer } from "../../reducer/slices/memberSlice";
import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Banner Users |||||||||||||||||||||||||

const BannerNewsletters = () => {
  // Hooks
  const modalRef = useRef(null);
  const bodyRef = document.body;

  // Redux
  const { search_newsletter } = useSelector((state) => state.memberReducer);
  const dispatch = useDispatch();

  // Functions
  const handleSearchChange = (e) => {
    let value = e;
    dispatch(setSearchNewslettersFromReducer(value));
  };

  return (
    <>
      <section className="banner_newsletters">
        <div className="search_form">
          <div className="input">
            <label htmlFor="search" className="search_icon">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search notification by email"
              value={search_newsletter}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        <NewslettersPaginatedForm />
      </section>
    </>
  );
};

export default BannerNewsletters;
