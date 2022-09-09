import React, { useEffect, useState } from "react";
import TrackModel from "./TracksModel";
import axios from "../../axios/index.js";
import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PaginatedTrackForm = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [isData, setIsData] = useState(false);

  const search = useSelector((state) => state.searchReducer.value);

  const FetchTracks = async () => {
    let offset = limit * currentPage - limit;

    await axios
      .get(`/api/tracks/list?search=${search}`)
      .then((res) => {
        let result = res.data.result;

        if (search.length > 0) {
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
  }, [search.length]);

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
              <th className="thead_title">Title</th>
              <th className="thead_time">Time</th>
              <th className="thead_bpm">Bpm</th>
              <th className="thead_tags">Tags</th>
              <th className="thead_link"></th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {isData !== false ? (
              currentData.map((track, key) => (
                <TrackModel key={key} track={track} />
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

export default PaginatedTrackForm;
