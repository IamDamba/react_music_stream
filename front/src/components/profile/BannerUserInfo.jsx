import axios from "axios";
import { set } from "mongoose";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useSelector } from "react-redux";

const BannerUserInfo = () => {
  const { user } = useContext(UserContext);
  const { token } = useSelector((state) => state.user);

  const formRef = useRef(null);

  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [showModal, setShowModal] = useState(false);

  const initValueToField = () => {
    if (user !== null) {
      setUsername(user.username !== undefined ? user.username : "");
      setfirstname(user.firstname !== undefined ? user.firstname : "");
      setLastname(user.lastname !== undefined ? user.lastname : "");
      setEmail(user.email !== undefined ? user.email : "");
      setAddress(user.address !== undefined ? user.address : "");
      setCountry(user.country !== undefined ? user.country : "");
    }
  };
  const updateUser = async () => {
    await axios
      .put("/api/userupdate", {
        token: token,
        username: username,
        firstname: firstname,
        lastname: lastname,
        address: address,
        country: country,
      })
      .then((res) => {
        console.log(res.data.message);
        document.location.reload();
      });
  };
  const updatePassword = async (e) => {
    await axios
      .put("/api/updatepassword", {
        token: token,
        password: e,
      })
      .then((res) => {
        console.log(res.data.message);
        document.location.reload();
      });
  };

  const handleChangePassword = async () => {
    let value = prompt("Enter Your Actual Password");

    await axios
      .post("/api/verifypassword", {
        token: token,
        password: value,
      })
      .then((res) => {
        if (res.data.isValid) {
          let v2 = prompt("Enter New Password");
          let v3 = prompt("Confirm Your New Password");

          if (v2 === v3) {
            updatePassword(v2);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    let linkRedirection = document.createElement("a");
    linkRedirection.href = "/";
    linkRedirection.click();
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure about that ?")) {
      await axios
        .post("/api/deleteaccount", {
          token: token,
        })
        .then((res) => {
          localStorage.removeItem("user_token");
          let linkRedirection = document.createElement("a");
          linkRedirection.href = "/";
          linkRedirection.click();
        });
    } else {
      console.log("Action canceled");
    }
  };

  useEffect(() => {
    initValueToField();
  }, []);

  return (
    <div className="user_info">
      <div className="first">
        <button className="btn" onClick={updateUser}>
          Save Change
        </button>
      </div>
      <form className="second" ref={formRef}>
        <input
          type="text"
          name="user_name"
          id="user_name"
          placeholder="Enter Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Enter First Name"
          value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
        />
        <input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Enter Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="full_address"
          id="full_address"
          placeholder="Enter Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </form>
      <div className="third">
        <h3>Security</h3>
        <div className="buttons">
          <div className="left">
            <button className="btn" onClick={() => handleChangePassword()}>
              Change Password
            </button>
            <button
              className="btn"
              onClick={() => {
                handleDeleteAccount();
              }}
            >
              Delete Account
            </button>
          </div>
          <div className="right">
            <button className="btn" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUserInfo;
