import "../styles/main/profile/profile.scss";
import React, { useEffect, useState, useContext } from "react";
import BannerUserInfo from "../components/profile/BannerUserInfo";
import BannerFavorites from "../components/profile/BannerFavorites";
import BannerOrders from "../components/profile/BannerOrders";
import BannerNotifications from "../components/profile/BannerNotifications";

import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const { user } = useContext(UserContext);
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
        return <BannerFavorites />;

        break;
      case 3:
        return <BannerOrders />;

        break;
      case 4:
        return <BannerNotifications />;

        break;
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (user !== null) {
      setIsLoading(false);
    } else {
      let linkRedirection = document.createElement("a");
      linkRedirection.href = "/signin";
      linkRedirection.click();
    }
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
                  <button onClick={(e) => handleBannerClick(2)}>
                    Favorites
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(3)}>Orders</button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(4)}>
                    Notifications
                  </button>
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
                  <button onClick={(e) => handleBannerClick(2)}>
                    Favorites
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(3)}>Orders</button>
                </li>
                <li>
                  <button onClick={(e) => handleBannerClick(4)}>
                    Notifications
                  </button>
                </li>
              </ul>
              <div className="banner_content">{setterNewBanner()}</div>
            </div>
          </section>
        </div>
      </main>
    );
  }
};

export default Profile;
