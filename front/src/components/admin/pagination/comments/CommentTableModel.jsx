//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../axios/index.js";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { setCommentToDeleteFromReducer } from "../../../../reducer/slices/memberSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentTableModel = ({ data }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  //Functions
  const handleClickLink = () => {
    dispatch(setCommentToDeleteFromReducer(data));
  };

  return (
    <tr key={data._id}>
      <td className="list_message">
        <p>{data.message}</p>
      </td>
      <td className="list_username">
        <p>{data.username}</p>
      </td>
      <td className="list_track_id">
        <p>{data.track_id}</p>
      </td>
      <td className="list_link">
        <button onClick={handleClickLink}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default CommentTableModel;
