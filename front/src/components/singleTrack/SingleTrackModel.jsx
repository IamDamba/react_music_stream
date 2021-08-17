import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const SingleTrackModel = ({ id }) => {
  const [icon, setIcon] = useState(faPlay);
  const [track, setTrack] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    await axios
      .get(`/api/tracks/q/?id=${id}`)
      .then((res) => {
        setIsLoaded(false);
        console.log(res.data.result);
        setTrack(res.data.result);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleIcon = () => {
    if (icon === faPlay) setIcon(faPause);
    else setIcon(faPlay);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return <p>Data is loading...</p>;
  }

  return (
    <div className="item">
      <div className="item_info">
        <div className="img">
          <img src={track.image} alt={track.title} />
          <div className="filter" onClick={handleIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
        <ul className="detail">
          <li>
            <h2>{track.title}</h2>
          </li>
          <li>
            <p>BPM - {track.bpm}</p>
          </li>
          <li>
            <p>Tag - {track.tag}</p>
          </li>
          <li className="add_btn">
            <button>
              Add to cart - <FontAwesomeIcon icon={faShoppingBasket} />
            </button>
          </li>
        </ul>
      </div>
      <div className="item_player_vizualiser"></div>
    </div>
  );
};

export default SingleTrackModel;
