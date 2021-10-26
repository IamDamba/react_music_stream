//|||||||||||||||||||| Dependances ||||||||||||||||||||
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../axios/index.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const InvoicesTableModel = ({ data }) => {
  //Variables
  const history = useHistory();
  const dispatch = useDispatch();

  //Functions
  return (
    <tr key={data._id}>
      <td className="list_id">
        <p>{data.id}</p>
      </td>
      <td className="list_user_id">
        <p>{data.user_id}</p>
      </td>
      <td className="list_status">
        <p>{data.state}</p>
      </td>
      <td className="list_total">
        <p>{data.total}</p>
      </td>
    </tr>
  );
};

export default InvoicesTableModel;
