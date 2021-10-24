import "../../styles/toast/toast.scss";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { removeToastItemFromReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const Toast = ({ position }) => {
  const { toast_list } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();

  const handleRemoveToast = (id) => {
    dispatch(removeToastItemFromReducer(id));
  };

  return (
    <div className="toast">
      <div className={`notification-container ${position}`}>
        {toast_list.map((toast, i) => (
          <div
            key={i}
            className={`notification-toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <div className="button">
              <button onClick={() => handleRemoveToast(toast.id)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toast;
