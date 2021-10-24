// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useRef } from "react";
import axios from "axios";
import CommentsPaginatedForm from "./pagination/comments/CommentsPaginatedForm";
import checkIcon from "../../media/toast/checkIcon.svg";
import warningIcon from "../../media/toast/warningIcon.svg";

import { messagePattern } from "../regex/Regex";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setSearchCommentsFromReducer,
  resetDataToDeleteFromReducer,
} from "../../reducer/slices/memberSlice";
import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Banner Users |||||||||||||||||||||||||

const BannerUsers = () => {
  // Hooks
  const modalRef = useRef(null);
  const bodyRef = document.body;

  // Redux
  const { search_comments, commentToDelete } = useSelector(
    (state) => state.memberReducer
  );
  const { toast_list, check_color, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  // Functions
  const handleSearchChange = (e) => {
    let value = e;
    dispatch(setSearchCommentsFromReducer(value));
  };
  const handleFromSubmit = async (e) => {
    if (!e) {
      dispatch(resetDataToDeleteFromReducer(null));
      modalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    } else {
      await axios
        .post("/api/member/comments/delete", {
          _id: commentToDelete._id,
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

          dispatch(resetDataToDeleteFromReducer(null));
          modalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Warning",
            description: err.response.data.message,
            backgroundColor: warning_color,
            icon: warningIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          dispatch(resetDataToDeleteFromReducer(null));
          modalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";
        });
    }
  };

  useEffect(() => {
    if (commentToDelete !== null) {
      modalRef.current.style.display = "flex";
      bodyRef.style.overflow = "hidden";
    } else {
      modalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    }
  }, [commentToDelete]);

  return (
    <>
      <section className="banner_comments">
        <div className="search_form">
          <div className="input">
            <label htmlFor="search" className="search_icon">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search comment username"
              value={search_comments}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        <CommentsPaginatedForm />
      </section>
      <div className="modal" ref={modalRef}>
        <div className="modal_content">
          <div className="modal_content_title">
            <h3>Are you sure to delete this user ?</h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="button">
              <button type="submit" onClick={() => handleFromSubmit(true)}>
                Yes
              </button>
            </div>
            <div className="button">
              <button type="submit" onClick={() => handleFromSubmit(false)}>
                No
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BannerUsers;
