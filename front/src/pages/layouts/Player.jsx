// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../styles/player/player.scss";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { setPlayPauseToPlayerAudioFromReducer } from "../../reducer/slices/playerSlice";

// ||||||||||||||||||||||| Player |||||||||||||||||||||||||

const Player = () => {
  // Hooks
  const [maxTimeText, setMaxTimeText] = useState("0:00");
  const [currentTimeText, setCurrentTimeText] = useState("0:00");
  const [buttonIcon, setButtonIcon] = useState(faHeadphonesAlt);
  const [playerIcon, setPlayerIcon] = useState(faPlay);
  const [showPlayer, setShowPlayer] = useState(false);

  const playerRef = useRef(null);
  const history = useHistory();

  //redux
  const { player_audio, player_value, player_image, player_id } = useSelector(
    (state) => state.playerReducer
  );
  const dispatch = useDispatch();

  //functions
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
  const handlePlayerAudioDuration = () => {
    if (player_value !== null) {
      let minutes = null;
      let seconds = null;
      let secondsWithLeadingZero = null;

      player_audio.addEventListener("timeupdate", () => {
        minutes = Math.floor(player_audio.duration / 60);
        seconds = Math.floor(player_audio.duration % 60);
        secondsWithLeadingZero = seconds < 10 ? "0" + seconds : seconds;

        setMaxTimeText(`${minutes}:${secondsWithLeadingZero}`);
      });
    }
  };
  const handlePlayPauseButton = () => {
    dispatch(setPlayPauseToPlayerAudioFromReducer());

    if (player_audio.paused) {
      setPlayerIcon(faPlay);
    } else {
      setPlayerIcon(faPause);
    }
    console.log(player_audio.paused);
  };
  const handleLink = () => {
    if (player_id !== null) {
      history.push(`/track/detail/${player_id}`);
    }
  };
  const uploadPlayerAudioCurrentTime = () => {
    if (player_value !== null) {
      let minutes = null;
      let seconds = null;
      let secondsWithLeadingZero = null;

      player_audio.addEventListener("timeupdate", () => {
        minutes = Math.floor(player_audio.currentTime / 60);
        seconds = Math.floor(player_audio.currentTime % 60);
        secondsWithLeadingZero = seconds < 10 ? "0" + seconds : seconds;

        setCurrentTimeText(`${minutes}:${secondsWithLeadingZero}`);
      });
    }
  };

  useEffect(() => {
    handlePlayerAudioDuration();
    uploadPlayerAudioCurrentTime();

    if (player_audio.paused) setPlayerIcon(faPlay);
    else setPlayerIcon(faPause);
  }, [player_audio.src]);

  return (
    <section className="music_player">
      <div className="content" ref={playerRef}>
        <div className="first">
          <div className="img">
            <img src={player_image !== undefined ? player_image : ""} alt="" />
          </div>
          <div className="filter">
            <button onClick={handlePlayPauseButton}>
              <FontAwesomeIcon icon={playerIcon} />
            </button>
          </div>
        </div>
        <div className="second">
          <div className="timer">
            <p>
              {currentTimeText} / {maxTimeText}
            </p>
          </div>
          <div className="slider">
            <input
              type="range"
              name="slider"
              id="slider"
              min="0"
              max={player_value !== null ? player_audio.duration : "0"}
              value={player_value !== null && player_audio.currentTime}
              onChange={(e) => {
                if (player_value !== null) {
                  uploadPlayerAudioCurrentTime();
                  player_audio.currentTime = e.target.value;
                }
              }}
            />
          </div>
          <div className="ext_link">
            <button onClick={handleLink}>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </button>
          </div>
        </div>
        <div className="third">
          <div className="useless"></div>
        </div>
      </div>
      <button className="music_player_button" onClick={handleShowPlayer}>
        <FontAwesomeIcon icon={buttonIcon} />
      </button>
    </section>
  );
};

export default Player;
