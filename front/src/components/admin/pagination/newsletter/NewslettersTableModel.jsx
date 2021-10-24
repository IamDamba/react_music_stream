//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const NewslettersTableModel = ({ data }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  //Functions
  return (
    <tr key={data._id}>
      <td className="list_id">
        <p>{data.id}</p>
      </td>
      <td className="list_email">
        <p>{data.email}</p>
      </td>
    </tr>
  );
};

export default NewslettersTableModel;
