import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPause,
  faPlay,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getPlayerAudioToReducer,
  handleSlicePlayPause,
} from "../../slices/trackSlice";
import AddCartModal from "./AddCartModal";

const SingleTrackModel = ({ id }) => {
  const [icon, setIcon] = useState("Listen");
  const [track, setTrack] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const addCartModalRef = useRef(null);
  const imageTrackRef = useRef(null);

  const { trackSlice, playerAudio } = useSelector((state) => state.trackSlice);
  const dispatch = useDispatch();

  const fetchData = () => {
    setIsLoaded(false);
    setTrack(trackSlice);
    setIsLoaded(true);
  };

  const handleListen = () => {
    if (playerAudio.track.id !== parseInt(id)) {
      let value = new Audio();
      value.src = track.media;
      dispatch(getPlayerAudioToReducer({ media: value, track: track }));
      console.log(playerAudio.track.id, id);
    } else {
      setIcon("Is Listening");
    }
  };

  const handleAddToCart = () => {
    return <AddCartModal />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (playerAudio.track.id !== parseInt(id)) {
      setIcon("Listen");
    } else {
      setIcon("Is Listening");
    }
  }, [playerAudio.track.id]);

  if (!isLoaded) {
    return <p>Data is loading...</p>;
  }

  return (
    <div className="item">
      <AddCartModal ref={}/>
      <div className="track_data">
        <div className="track_cover">
          <div className="img" onClick={handleListen}>
            <img src={track.image} alt="" />
            <div className="filter">
              <button>{icon}</button>
            </div>
          </div>
          <ul className="buttons">
            <li>
              <button>
                Add to favorites <FontAwesomeIcon icon={faHeart} />
              </button>
            </li>
            <li>
              <button onClick={handleAddToCart}>
                Add to cart <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </li>
          </ul>
        </div>
        <div className="track_info">
          <h2>{track.title}</h2>
          <p>Time - 02:08</p>
          <p>BPM - {track.bpm}</p>
          <div className="tag">
            <button value={track.tag}>{track.tag}</button>
          </div>
        </div>
      </div>
      <div className="visualizer">
        <canvas className="track_visualizer"></canvas>
      </div>
      <div className="comments">
        <div className="track_comment_title">
          <h2>Comments(0)</h2>
        </div>
        <div className="track_comment_list">No comments have been found.</div>
        <div className="track_comment_form">
          <div className="input">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="buttons">
            <button>Send Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTrackModel;
