import React, { useContext } from "react";

import { TracksContext } from "../contexts/TracksContext";
import { withRouter } from "react-router-dom";

const TagModel = ({ value, history }) => {
  const { setSearch } = useContext(TracksContext);

  const handleClick = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    history.push("/tracks");
    window.scrollTo(0, 0);
  };

  return (
    <div className="item">
      <button value={value} onClick={handleClick.bind(this)}>
        {value}
      </button>
    </div>
  );
};

export default withRouter(TagModel);
