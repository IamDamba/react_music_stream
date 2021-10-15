import "../../../styles/main/single_track/single_track.scss";
import React, { useEffect, useState, useContext, Suspense, lazy } from "react";

import { useParams } from "react-router-dom";
import ShoppingCartModal from "../../../components/singleTrack/ShoppingCartModal";

const SingleTrackModel = lazy(() =>
  import("../../../components/singleTrack/SingleTrackModel.jsx")
);

const SingleTrack = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const { track_id } = useParams();

  return (
    <main className="single_track">
      <div className="content">
        <section className="content_header">
          <h1>Single Track</h1>
        </section>
        <section className="track_list_detail">
          <Suspense fallback={<p>Data is Loading...</p>}>
            <SingleTrackModel id={parseInt(track_id)} />
          </Suspense>
        </section>
      </div>
      <ShoppingCartModal />
    </main>
  );
};

export default SingleTrack;
