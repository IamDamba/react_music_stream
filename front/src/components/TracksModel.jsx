//|||||||||||||||||||| Dependances ||||||||||||||||||||

import React from "react";
import TagModel from "./TagModel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//|||||||||||||||||||| Component ||||||||||||||||||||

const TracksModel = ({ track }) => {
  //|||||||||||||||||||| Return ||||||||||||||||||||

  return (
    <tr key={track.id}>
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
        <Link to={`/track/detail/${track.id}`}>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Link>
      </td>
    </tr>
  );
};

export default TracksModel;
