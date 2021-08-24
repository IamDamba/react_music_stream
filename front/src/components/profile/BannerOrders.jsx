import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const BannerOrders = () => {
  return (
    <div className="orders">
      <div className="second">
        <div className="list">
          <div className="item">
            <div className="id">
              <p>1010101010</p>
            </div>
            <div className="date">
              <p>01/08/2021</p>
            </div>
            <div className="price">
              <p>49.99€</p>
            </div>
            <div className="status">
              <p>PAID</p>
            </div>
            <div className="buttons">
              <button className="btn">
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOrders;
