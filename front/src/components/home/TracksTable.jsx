import React, { useEffect, useState } from "react";
import axios from "axios";
import TracksModel from "../TracksModel";

const TracksForm = () => {
  const [data, setData] = useState([]);

  const fetchTrack = async () => {
    await axios
      .get("/api/tracks/all")
      .then(async (res) => {
        setData(res.data.slice(0, 4));
      })
      .catch(async (err) => {
        console.log(err.message);
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
          <th>Title</th>
          <th>Time</th>
          <th>Bpm</th>
          <th>Tags</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
        {data.map((el, key) => (
          <TracksModel track={el} key={key} />
        ))}
      </tbody>
    </table>
  );
};

export default TracksForm;
