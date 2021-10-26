import React, { useEffect, useState } from "react";
import axios from "../../axios/index.js";
import TracksModel from "./TracksModel";
import warningIcon from "../../media/toast/warningIcon.svg";

import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const TracksForm = () => {
  // Hooks
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);

  // Redux
  const { toast_list, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  const fetchTrack = async () => {
    await axios
      .get("/api/tracks/all")
      .then(async (res) => {
        setData(res.data.slice(0, 4));
        setIsData(true);
      })
      .catch(async (err) => {
        const toast_item = {
          id: toast_list.length + 1,
          title: "Warning",
          description: err.response.data.message,
          backgroundColor: warning_color,
          icon: warningIcon,
        };

        dispatch(setToastItemToReducer(toast_item));
        setData(false);
      });
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th className="thead_title">Title</th>
          <th className="thead_time">Time</th>
          <th className="thead_bpm">Bpm</th>
          <th className="thead_tags">Tags</th>
          <th className="thead_link"></th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
        {isData ? (
          data.map((el, key) => <TracksModel track={el} key={key} />)
        ) : (
          <p>No Data Found.</p>
        )}
      </tbody>
    </table>
  );
};

export default TracksForm;
