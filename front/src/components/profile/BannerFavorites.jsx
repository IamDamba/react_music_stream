import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const BannerFavorites = () => {
  return (
    <div className="favorites">
      <div className="second">
        <div className="list">
          <div className="item">
            <div className="img">
              <img src="" alt="" />
            </div>
            <div className="title">
              <p>Track Title</p>
            </div>
            <div className="bpm">
              <p>112</p>
            </div>
            <div className="tags">
              <button className="tag" value="Drake">
                Drake
              </button>
            </div>
            <div className="buttons">
              <button className="btn">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </button>
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

export default BannerFavorites;
