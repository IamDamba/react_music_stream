import "../../styles/music_player/music_player.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  faChevronDown,
  faExternalLinkAlt,
  faHeadphonesAlt,
  faPause,
  faPlay,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { handleVolume } from "../../slices/trackSlice";

const MusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [buttonIcon, setButtonIcon] = useState(faHeadphonesAlt);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerIcon, setPlayerIcon] = useState(faPlay);

  const playerRef = useRef(null);

  const { playerAudio, canPlayAudio } = useSelector(
    (state) => state.trackSlice
  );
  const dispatch = useDispatch();

  // ||||||||||||||||||||||||| Function

  const handleShowPlayer = () => {
    if (!showPlayer) {
      setShowPlayer(!showPlayer);
      setButtonIcon(faChevronDown);
      playerRef.current.style.bottom = "0%";
    } else {
      setShowPlayer(!showPlayer);
      setButtonIcon(faHeadphonesAlt);
      playerRef.current.style.bottom = "-50%";
    }
  };

  if (playerAudio !== null) {
    playerAudio.media.addEventListener("timeupdate", () => {
      setCurrentTime(playerAudio.media.currentTime);
    });
  }

  return (
    <section id="music_player">
      <div className="content" ref={playerRef}>
        <div className="img">
          <img
            src={playerAudio !== null ? playerAudio.track.image : ""}
            alt="image"
          />
          <div
            className="filter"
            onClick={() =>
              playerIcon == faPlay
                ? setPlayerIcon(faPause)
                : setPlayerIcon(faPlay)
            }
          >
            <FontAwesomeIcon icon={playerIcon} />
          </div>
        </div>
        <div className="time">
          <p>0:00 / 02:18</p>
        </div>
        <div className="slider">
          <input
            type="range"
            min="0"
            max={playerAudio !== null ? playerAudio.media.duration : 0}
            value={currentTime}
            onChange={(e) => {
              if (playerAudio !== null)
                playerAudio.media.currentTime = e.target.value;
            }}
            name="slider_range"
            id="slider_range"
            className="slider_range"
          />
        </div>
        <div className="buttons">
          <button className="btn">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </button>
          <button className="fake_btn"></button>
        </div>
      </div>
      <button className="music_player_button" onClick={handleShowPlayer}>
        <FontAwesomeIcon icon={buttonIcon} />
      </button>
    </section>
  );
};

export default MusicPlayer;
