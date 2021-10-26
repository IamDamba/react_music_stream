//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../axios/index.js";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { setUserToDeleteFromReducer } from "../../../../reducer/slices/memberSlice";
import { useDispatch, useSelector } from "react-redux";

const UserTableModel = ({ data }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  //Functions
  const handleClickLink = () => {
    dispatch(setUserToDeleteFromReducer(data));
  };

  return (
    <tr key={data._id}>
      <td className="list_id">
        <p>{data._id}</p>
      </td>
      <td className="list_username">
        <p>{data.username}</p>
      </td>
      <td className="list_email">
        <p>{data.email}</p>
      </td>
      <td className="list_link">
        <button onClick={handleClickLink}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default UserTableModel;
