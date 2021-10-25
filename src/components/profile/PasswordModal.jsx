import React, { useRef, useState } from "react";
import axios from "axios";

import { setUserToReducer } from "../../reducer/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PasswordModal = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);

  const handleCloseBtn = () => {
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
      modalRef.current.style.display = "none";
    }
  };
  const updateUserPassword = async (e) => {
    e.preventDefault();
    if (confirmNewPassword !== newPassword) {
      console.log("Passwords are different");
    } else {
      await axios
        .put("/api/updatepassword", {
          token: token,
          password: newPassword,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="email_modal" ref={modalRef}>
      <div className="content">
        <div className="content_header">
          <h2>Change Password</h2>
          <button onClick={handleCloseBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="content_body">
          <form onSubmit={updateUserPassword.bind(this)}>
            <div className="input">
              <input
                type="password"
                name="change_password"
                id="change_password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                name="change_confirm_password"
                id="change_confirm_password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="button">
              <button type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
