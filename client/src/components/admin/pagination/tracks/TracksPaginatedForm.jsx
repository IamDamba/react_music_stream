import React, { useEffect, useState } from "react";
import TrackTableModel from "./TrackTableModel";
import axios from "../../../../axios/index.js";
import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TracksPaginatedForm = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [isData, setIsData] = useState(false);

  const search_tracks = useSelector(
    (state) => state.memberReducer.search_tracks
  );

  const FetchTracks = async () => {
    let offset = limit * currentPage - limit;

    await axios
      .get(`/api/member/tracks?search=${search_tracks}`)
      .then((res) => {
        let result = res.data.result;

        if (search_tracks.length > 0) {
          setIsData(true);
          setData(result);
          setCurrentData(result.slice(0, limit * currentPage));
        } else {
          setIsData(true);
          setData(result);
          setCurrentData(result.slice(offset, limit * currentPage));
        }
      })
      .catch((err) => {});
  };
  const pageNumber = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    FetchTracks();
  }, [search_tracks.length]);

  useEffect(() => {
    data.length > 0 ? setIsData(true) : setIsData(false);
    let offset = limit * currentPage - limit;
    setCurrentData(data.slice(offset, limit * currentPage));
  }, [currentPage]);

  const pageCount = Math.ceil(data.length / limit);

  return (
    <>
      <div className="tracks_list_table">
        <table>
          <thead>
            <tr>
              <th className="thead_message">Id</th>
              <th className="thead_username">Title</th>
              <th className="thead_track_id">Tags</th>
              <th className="thead_link"></th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {isData !== false ? (
              currentData.map((track, key) => (
                <TrackTableModel key={key} data={track} />
              ))
            ) : (
              <p>No data was found.</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="tracks_list_pagination">
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          breakLabel={"..."}
          breakClassName={"_break"}
          pageCount={pageCount}
          onPageChange={pageNumber.bind(this)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default TracksPaginatedForm;
