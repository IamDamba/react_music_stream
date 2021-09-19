import "../../../styles/main/tracks/tracks.scss";
import React, { useEffect, useState, useContext } from "react";
import PaginatedTrackForm from "../../../components/tracks/PaginatedTrackForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValuetoReducer } from "../../../reducer/slices/searchSlice";

const AllTracks = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  //Variables
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.searchReducer);

  // Functions
  const handleSearch = (e) => {
    e.preventDefault();
    let query = e.target.value;

    if (query.length > 2) {
      dispatch(setSearchValuetoReducer(query));
    } else {
      dispatch(setSearchValuetoReducer(query));
      console.log("Query is too short");
    }
  };

  return (
    <main className="tracks">
      <div className="content">
        <section className="content_header">
          <h1>All Tracks</h1>
          <form>
            <div className="input">
              <label htmlFor="search" className="search_icon">
                <FontAwesomeIcon icon={faSearch} />
              </label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder='Try search for tags "Drake" or "Lil Baby"'
                value={value}
                onChange={handleSearch.bind(this)}
              />
            </div>
          </form>
        </section>
        <section className="tracks_list">
          <div className="tracks_list_filter">
            <div className="filters">
              <select name="filter_sort" id="filter_sort">
                <option value="">Sort</option>
                <option value="title">Ascending</option>
                <option value="time">Descending</option>
              </select>
            </div>
          </div>
          <PaginatedTrackForm />
        </section>
      </div>
    </main>
  );
};

export default AllTracks;
