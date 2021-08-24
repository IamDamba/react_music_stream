import "../styles/main/tracks/tracks.scss";
import React, { useEffect, useState, useContext } from "react";
import { TracksContext } from "../contexts/TracksContext";
import PaginatedForm from "../components/tracks/PaginatedTrackForm";

import { useDispatch } from "react-redux";
import { updateQuery } from "../slices/searchSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Tracks = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const { search, setSearch } = useContext(TracksContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length > 2) dispatch(updateQuery(search));
    else dispatch(updateQuery(""));
  }, [search]);

  return (
    <main className="tracks">
      <div className="content">
        <section className="content_header">
          <h1>All Tracks</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input">
              <label htmlFor="search" className="search_icon">
                <FontAwesomeIcon icon={faSearch} />
              </label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder='Try search for tags "Drake" or "Lil Baby"'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </section>
        <section className="tracks_list">
          <div className="tracks_list_filter">
            <div className="filters">
              <select name="filter_types" id="filter_types">
                <option value="">Types</option>
                <option value="title">Title</option>
                <option value="time">Time</option>
                <option value="bpm">Bpm</option>
                <option value="tags">Tags</option>
              </select>
              <select name="filter_genres" id="filter_genres">
                <option value="">Genres</option>
                <option value="title">Rap</option>
                <option value="time">RnB</option>
                <option value="bpm">Hip Hop</option>
                <option value="tags">Soul</option>
                <option value="tags">Drill</option>
                <option value="tags">lo-fi</option>
              </select>
              <select name="filter_sort" id="filter_sort">
                <option value="">Sort</option>
                <option value="title">Ascending</option>
                <option value="time">Descending</option>
                <option value="bpm">Hip Hop</option>
              </select>
            </div>
          </div>
          <PaginatedForm />
        </section>
      </div>
    </main>
  );
};

export default Tracks;
