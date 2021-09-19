import React, { useEffect, useState } from "react";
import axios from "axios";
import TracksModel from "./TracksModel";

const TracksForm = () => {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);

  const fetchTrack = async () => {
    await axios
      .get("/api/tracks/all")
      .then(async (res) => {
        setData(res.data.slice(0, 4));
        setIsData(true);
      })
      .catch(async (err) => {
        console.log(err.message);
        setData(false);
      });
  };

  useEffect(async () => {
    await fetchTrack();
  }, []);

  console.log(data);

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
