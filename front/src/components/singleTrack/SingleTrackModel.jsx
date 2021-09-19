// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setTrackToReducer } from "../../reducer/slices/tracksSlices";
import { setMediaToReducer } from "../../reducer/slices/playerSlice";
import { setCartItemToReducer } from "../../reducer/slices/cartSlice";

// ||||||||||||||||||||||| SingleTrackModel |||||||||||||||||||||||||

const SingleTrackModel = ({ id }) => {
  const [listenTextBtn, setListenTextBtn] = useState("Listen");
  const [track, setTrack] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { track_value } = useSelector((state) => state.tracksReducer);
  const { player_value, player_id } = useSelector(
    (state) => state.playerReducer
  );
  const { cart_list } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const dataFetch = async () => {
    await axios
      .get(`/api/tracks/q/?id=${id}`)
      .then((res) => {
        if (player_id === parseInt(id)) {
          setListenTextBtn("Is Playing");
        } else {
          setListenTextBtn("Listen");
        }

        setTrack(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleListenBtn = () => {
    if (listenTextBtn == "Listen") {
      dispatch(setMediaToReducer({ id: parseInt(id), media: track.media }));
      setListenTextBtn("Is Playing");
    }
  };
  const handleCartBtn = () => {
    dispatch(
      setCartItemToReducer({
        id: track.id,
        image: track.image,
        title: track.title,
      })
    );
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.querySelector(".modale_cart").style.display = "flex";
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    console.log("reducer: " + track_value);

    if (track_value.id == undefined) {
      console.log("La veleur est undefined");
      dispatch(setTrackToReducer(track));
    } else {
      if (track_value.id !== parseInt(id)) {
        console.log("Changement de track");
        dispatch(setTrackToReducer(track));
      }
    }

    setIsLoaded(true);
  }, [track]);

  return !isLoaded ? (
    <p>Data is Loading...</p>
  ) : (
    <div className="item">
      <div className="track_data">
        <div className="track_cover">
          <div className="img">
            <img src={track_value.image} alt="" />
            <div className="filter">
              <button
                value={listenTextBtn}
                onClick={handleListenBtn.bind(this)}
              >
                {listenTextBtn}
              </button>
            </div>
          </div>
          <ul className="buttons">
            <li>
              <button onClick={handleCartBtn}>
                Add to cart <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </li>
          </ul>
        </div>
        <div className="track_info">
          <h2>{track_value.title}</h2>
          <p>Time - 02:08</p>
          <p>BPM - 112</p>
          <div className="tag">
            <button>{track_value.tag}</button>
          </div>
        </div>
      </div>
      <div className="comments">
        <div className="track_comment_title">
          <h2>Comments(0)</h2>
        </div>
        <div className="track_comment_list">No comments have been found.</div>
        <div className="track_comment_form">
          <div className="input">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="buttons">
            <button>Send Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTrackModel;
