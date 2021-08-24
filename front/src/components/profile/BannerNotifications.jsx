import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BannerNotifications = () => {
  return (
    <div className="notifications">
      <div className="second">
        <div className="list">
          <div className="item">
            <div className="info">
              <p>New notification has appeared</p>
            </div>
            <div className="buttons">
              <button className="btn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerNotifications;
