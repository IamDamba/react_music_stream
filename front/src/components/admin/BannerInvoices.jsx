// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useRef } from "react";
import axios from "../../axios/index.js";
import InvoicesPaginatedForm from "./pagination/invoices/InvoicesPaginatedForm.jsx";
import checkIcon from "../../media/toast/checkIcon.svg";
import warningIcon from "../../media/toast/warningIcon.svg";

import { messagePattern } from "../regex/Regex";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSearchInvoicesFromReducer } from "../../reducer/slices/memberSlice";
import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Banner Users |||||||||||||||||||||||||

const BannerInvoices = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Hooks
  const modalRef = useRef(null);
  const bodyRef = document.body;

  // Redux
  const { search_invoice } = useSelector((state) => state.memberReducer);
  const dispatch = useDispatch();

  // Functions
  const handleSearchChange = (e) => {
    let value = e;
    dispatch(setSearchInvoicesFromReducer(value));
  };

  return (
    <>
      <section className="banner_invoices">
        <div className="search_form">
          <div className="input">
            <label htmlFor="search" className="search_icon">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search Invoices by User ID"
              value={search_invoice}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        <InvoicesPaginatedForm />
      </section>
    </>
  );
};

export default BannerInvoices;
