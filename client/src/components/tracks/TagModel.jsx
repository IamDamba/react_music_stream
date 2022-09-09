import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchValuetoReducer } from "../../reducer/slices/searchSlice";

const TagModel = ({ value }) => {
  //variables
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchValuetoReducer(value));
    history.push("/tracks");
  };

  return (
    <div className="item">
      <button onClick={handleClick.bind(this)}>{value}</button>
    </div>
  );
};

export default TagModel;
