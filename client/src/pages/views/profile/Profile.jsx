import "../../../styles/main/profile/profile.scss";
import React, { useEffect, useState, useContext } from "react";
import BannerUserInfo from "../../../components/profile/BannerUserInfo";
import BannerOrders from "../../../components/profile/BannerOrders";
import PasswordModal from "../../../components/profile/PasswordModal";
import DeleteUserModal from "../../../components/profile/DeleteUserModal";

import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const [banner, setBanner] = useState(null);
  const [bannerId, setBannerId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleBannerClick = (e) => {
    setBannerId(e);
  };
  const setterNewBanner = () => {
    switch (bannerId) {
      case 1:
        return <BannerUserInfo />;
      case 2:
        return <BannerOrders />;
        break;
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    console.log(bannerId);
    setterNewBanner();
  }, [bannerId]);

  if (isLoading) {
    return (
      <main className="profile">
        <div className="content">
          <section className="content_header">
            <h1>User Profile</h1>
          </section>
          <section className="profile_content">
            <div className="banner">
              <ul className="banner_header">
                <li>
                  <button onClick={(e) => handleBannerClick(1)}>
                    User Info
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(2)}>Orders</button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    );
  } else {
    return (
      <main className="profile">
        <div className="content">
          <section className="content_header">
            <h1>User Profile</h1>
          </section>
          <section className="profile_content">
            <div className="banner">
              <ul className="banner_header">
                <li>
                  <button onClick={(e) => handleBannerClick(1)}>
                    User Info
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(2)}>Orders</button>
                </li>
              </ul>
              <div className="banner_content">{setterNewBanner()}</div>
            </div>
          </section>
        </div>
        <PasswordModal />
        <DeleteUserModal />
      </main>
    );
  }
};

export default Profile;
