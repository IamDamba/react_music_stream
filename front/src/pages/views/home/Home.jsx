//||||||||||||||||| Dependances ||||||||||||||||||||

import "../../../styles/main/home/home.scss";
import React, { useContext, useState, lazy, Suspense } from "react";
import Banner from "../../../media/banner/banner.jpg";
import Licences from "../../../media/licences/licences.jpg";
import TagModel from "../../../components/tracks/TagModel";
import TracksTable from "../../../components/tracks/TracksTable";

import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSearchValuetoReducer } from "../../../reducer/slices/searchSlice";

const Home = () => {
  window.scrollTo(0, 0);

  //Variables
  const dispatch = useDispatch();
  const history = useHistory();

  // Functions
  const handleSearch = (e) => {
    let query = e.target.search.value;

    if (query.length > 2) {
      e.preventDefault();
      dispatch(setSearchValuetoReducer(query));
      history.push("/tracks");
      window.scrollTo(0, 0);
      e.target.search.value = "";
    } else {
      e.preventDefault();
      console.log("Query is too short");
    }
  };

  return (
    <main id="home">
      <div className="content">
        <div className="banner">
          <div className="img">
            <img src={Banner} alt="banner" />
            <div className="filter"></div>
          </div>
        </div>
        <div className="content_header">
          <div className="first">
            <h1>Buy Beats made by real musician with heart & soul</h1>
            <h2>Search for the beat that feat you</h2>
          </div>
          <div className="second">
            <form className="input" onSubmit={handleSearch.bind(this)}>
              <label htmlFor="search" className="search_icon">
                <FontAwesomeIcon icon={faSearch} />
              </label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder='Try search for tags "Drake" or "Lil Baby"'
              />
            </form>
            <div className="tags">
              <label>Trending:</label>
              <div className="list">
                <TagModel value="Lil Baby" />
                <TagModel value="Drake" />
              </div>
            </div>
          </div>
        </div>
        <section className="home_tracks">
          <div className="home_tracks_first">
            <h2>Tracks</h2>
            <Link to="/tracks">See More</Link>
          </div>
          <div className="home_tracks_second">
            <TracksTable />
          </div>
        </section>
        <section className="home_licences">
          <div className="img">
            <img src={Licences} alt="Licences" />
            <div className="filter"></div>
          </div>
          <div className="home_licences_content">
            <div className="first">
              <h2>Licencing Methods</h2>
              <h3>
                Here are all the licencing methods we provides to all of you,
                just choose wich one will fit you best.
              </h3>
            </div>
            <div className="second">
              <Link to="/">See More</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
