//|||||||||||||||||||| Dependances ||||||||||||||||||||

import React from "react";
import TagModel from "./TagModel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrackToReducer } from "../slices/trackSlice";

const TracksModel = ({ track, history }) => {
  const dispatch = useDispatch();

  //|||||||||||||||||||| function ||||||||||||||||||||
  const handleClick = () => {
    dispatch(getTrackToReducer(track));
  };

  const handleClickLink = () => {
    dispatch(getTrackToReducer(track));
    history.push(`/track/detail/${track.id}`);
  };

  return (
    <tr key={track.id} onClick={handleClick}>
      <td className="list_title">
        <img src={track.image} alt={`${track.title}`} />
        <p>{track.title}</p>
      </td>
      <td className="list_time">
        <p>{track.time}</p>
      </td>
      <td className="list_bpm">
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

export default withRouter(TracksModel);
