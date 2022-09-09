//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios/index.js";

import TagModel from "./TagModel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { setTrackToReducer } from "../../reducer/slices/tracksSlices";
import { setMediaToReducer } from "../../reducer/slices/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const TracksModel = ({ track }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  const { player_value, player_id } = useSelector(
    (state) => state.playerReducer
  );

  //Functions
  const handleClickLink = () => {
    dispatch(setTrackToReducer(track));
    history.push(`/track/detail/${track.id}`);
  };

  const handleTrackClick = () => {
    try {
      if (player_id !== track.id) {
        console.log("ok, je change la track");
        dispatch(
          setMediaToReducer({
            id: track.id,
            media: track.media,
            image: track.image,
          })
        );
      } else {
        console.log("La track est deja joué");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr key={track.id}>
      <td className="list_title" onClick={handleTrackClick}>
        <img src={track.image} alt={`${track.title}`} />
        <p>{track.title}</p>
      </td>
      <td className="list_time" onClick={handleTrackClick}>
        <p>{track.time}</p>
      </td>
      <td className="list_bpm" onClick={handleTrackClick}>
        <p>{track.bpm}</p>
      </td>
      <td className="list_tags">
        <TagModel value={track.tag} />
      </td>
      <td className="list_link">
        <button onClick={handleClickLink}>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </button>
      </td>
    </tr>
  );
};

export default TracksModel;
