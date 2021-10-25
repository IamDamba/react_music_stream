//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  setTrackToDeleteFromReducer,
  setTrackToUpdateFromReducer,
} from "../../../../reducer/slices/memberSlice";
import { useDispatch, useSelector } from "react-redux";

const TrackTableModel = ({ data }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  //Functions
  const handleClickLink = () => {
    dispatch(setTrackToDeleteFromReducer(data));
  };
  const handleUpdateTrack = (data) => {
    dispatch(setTrackToUpdateFromReducer(data));
  };

  return (
    <tr key={data.id}>
      <td className="list_id" onClick={() => handleUpdateTrack(data)}>
        <p>{data.id}</p>
      </td>
      <td className="list_title" onClick={() => handleUpdateTrack(data)}>
        <p>{data.title}</p>
      </td>
      <td className="list_tag" onClick={() => handleUpdateTrack(data)}>
        <p>{data.tag}</p>
      </td>
      <td className="list_link">
        <button onClick={handleClickLink}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default TrackTableModel;
