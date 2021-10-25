import React, { useRef } from "react";
import axios from "axios";

import { resetTokenToReducer } from "../../reducer/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteUserModal = () => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);

  const handleCloseBtn = () => {
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
      modalRef.current.style.display = "none";
    }
  };
  const handleDeleteUser = async () => {
    let a = document.createElement("a");
    a.href = "/";

    await axios
      .post("https://music-stream-serverside.herokuapp.com//deleteaccount", {
        token: token,
      })
      .then((res) => {
        dispatch(resetTokenToReducer());
        a.click();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="delete_user_modal" ref={modalRef}>
      <div className="content">
        <div className="content_header">
          <h2>Delete Account</h2>
          <button onClick={handleCloseBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="content_body">
          <div className="question">
            <p>Are you sure to delete your account?</p>
          </div>
          <div className="button">
            <button onClick={handleDeleteUser}>Yes</button>
            <button onClick={handleCloseBtn}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
