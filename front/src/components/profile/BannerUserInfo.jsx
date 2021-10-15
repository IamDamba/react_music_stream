import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserToReducer,
  resetTokenToReducer,
} from "../../reducer/slices/userSlice";

const BannerUserInfo = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [usernameField, setUsernameField] = useState(null);
  const [emailField, setEmailField] = useState(null);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userReducer);

  const fetchUserData = async () => {
    await axios
      .post("/api/currentuser", {
        token: token,
      })
      .then((res) => {
        let data = res.data.user;
        dispatch(setUserToReducer(data));
        console.log('true');
        setIsDataLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const updateUserData = async () => {
    await axios
      .put("/api/userupdate", {
        token: token,
        username: usernameField,
        email: emailField,
      })
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleSubmitForm = (e) => {
    if (usernameField.length >= 3) {
      updateUserData();
    } else {
      console.log("Username is too short, at least 3 char. ");
    }
    if (emailField.length >= 3) {
      updateUserData();
    } else {
      console.log("Email is not valid. ");
    }
  };
  const handlePasswordModalBtn = () => {
    let modalRef = document.querySelector(".email_modal");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    modalRef.style.display = "flex";
  };
  const handleDeleteUserModalBtn = () => {
    let modalRef = document.querySelector(".delete_user_modal");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    modalRef.style.display = "flex";
  };
  const handleLogout = () => {
    let a = document.createElement("a");
    a.href = "/";
    dispatch(resetTokenToReducer());
    a.click();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setUsernameField(user.username);
    setEmailField(user.email);
  }, [user]);

  console.log(isDataLoaded);

  if (!isDataLoaded)
    return (
      <div className="user_info">
        <p>Data is Loading</p>
      </div>
    );

  return (
    <div className="user_info">
      <div className="first">
        <button className="btn" onClick={handleSubmitForm}>
          Save Change
        </button>
      </div>
      <form className="second">
        <input
          type="text"
          name="user_name"
          id="user_name"
          placeholder="Enter Name"
          value={usernameField}
          onChange={(e) => setUsernameField(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </form>
      <div className="third">
        <h3>Security</h3>
        <div className="buttons">
          <div className="left">
            <button className="btn" onClick={handlePasswordModalBtn}>
              Change Password
            </button>
            <button className="btn" onClick={handleDeleteUserModalBtn}>
              Delete Account
            </button>
          </div>
          <div className="right">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUserInfo;
