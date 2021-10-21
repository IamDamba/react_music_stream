// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/admin/adminDashboard.scss";
import React, { useEffect, useState } from "react";
import Logo from "../../../media/logo/logo.svg";
import BannerTracks from "../../../components/admin/BannerTracks";
import BannerUsers from "../../../components/admin/BannerUsers";
import BannerComments from "../../../components/admin/BannerComments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserAlt,
  faMusic,
  faCommentAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, Prompt } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetMemberFromReducer } from "../../../reducer/slices/memberSlice";

// ||||||||||||||||||||||| Admin Dashboard |||||||||||||||||||||||||

const AdminDashboard = () => {
  // Hooks
  const [canLeave, setCanLeave] = useState(false);
  const [bannerValue, setBannerValue] = useState(1);

  // Redux
  const dispatch = useDispatch();

  // Functons
  const handlebannerId = (e) => {
    setBannerValue(e);
  };
  const handleShowBanner = () => {
    try {
      switch (bannerValue) {
        case 1:
          return <BannerUsers />;
        case 2:
          return <BannerTracks />;
        case 3:
          return <BannerComments />;
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = () => {
    let redirect = document.createElement("a");
    redirect.href = "/";
    dispatch(resetMemberFromReducer());
    redirect.click();
  };

  useEffect(() => {
    handleShowBanner();
  }, [bannerValue]);

  return (
    <main className="admin_dashboard">
      <div className="mobile">
        <div className="content_header">
          <h1>Error 404 - Device too small</h1>
        </div>
        <section className="error404_body">
          <p>
            You can't access admin page on mobile, please reconnect from a
            laptop/desktop
          </p>
        </section>
      </div>
      <div className="desktop">
        <header>
          <div className="first">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
          </div>
          <div className="second">
            <div className="welcome">
              <p>Welcom back, user !</p>
            </div>
            <div className="button">
              <button onClick={handleSignOut}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </div>
        </header>
        <aside className="admin_menu">
          <ul>
            <li>
              <button onClick={(e) => handlebannerId(1)}>
                <FontAwesomeIcon icon={faUserAlt} />
              </button>
            </li>
            <li>
              <button onClick={(e) => handlebannerId(2)}>
                <FontAwesomeIcon icon={faMusic} />
              </button>
            </li>
            <li>
              <button onClick={(e) => handlebannerId(3)}>
                <FontAwesomeIcon icon={faCommentAlt} />
              </button>
            </li>
          </ul>
        </aside>
        <section className="content">
          <div className="banner">
            <div className="banner_content">{handleShowBanner()}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
