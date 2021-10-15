// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setTrackToReducer,
  setTrackCommentsToReducer,
} from "../../reducer/slices/tracksSlices";
import { setMediaToReducer } from "../../reducer/slices/playerSlice";
import {
  setCartItemToReducer,
  setCartTextFromReducer,
} from "../../reducer/slices/cartSlice";

// ||||||||||||||||||||||| SingleTrackModel |||||||||||||||||||||||||

const SingleTrackModel = ({ id }) => {
  const [listenTextBtn, setListenTextBtn] = useState("Listen");
  const [track, setTrack] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const messageRef = useRef(null);

  const { token } = useSelector((state) => state.userReducer);
  const { track_value, track_comments } = useSelector(
    (state) => state.tracksReducer
  );
  const { player_id } = useSelector((state) => state.playerReducer);
  const { cart_list, cart_text } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const dataFetch = async () => {
    await axios
      .get(`/api/tracks/q/?id=${id}`)
      .then((res) => {
        if (player_id === id) {
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
  const fetchComments = async () => {
    await axios
      .post(`/api/tracks/comments?id=${id}`, {
        id: id,
      })
      .then((res) => {
        console.log(res.data.results);
        dispatch(setTrackCommentsToReducer(res.data.results));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleListenBtn = () => {
    if (listenTextBtn == "Listen") {
      dispatch(
        setMediaToReducer({ id: id, media: track.media, image: track.image })
      );
      setListenTextBtn("Is Playing");
    }
  };
  const handleCartBtn = () => {
    let _IsItemFound = false;
    let _itemCatch = 0;

    if (cart_list.length < 1) {
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
    }

    cart_list.forEach((element) => {
      if (element.id === id) {
        _itemCatch = element.id;
        return;
      }
    });

    dispatch(setCartTextFromReducer({ surrogate: _itemCatch, id: id }));

    if (_itemCatch !== id) {
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
    }
  };
  const handleSubmitComment = async () => {
    await axios
      .post("/api/tracks/comments/create", {
        token: token,
        id: id,
        message: messageRef.current.value,
      })
      .then((res) => {
        messageRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataFetch();
    fetchComments();
  }, []);
  useEffect(() => {
    console.log("reducer: " + track_value);

    if (track_value.id == undefined) {
      console.log("La veleur est undefined");
      dispatch(setTrackToReducer(track));
    } else {
      if (track_value.id !== id) {
        console.log("Changement de track");
        dispatch(setTrackToReducer(track));
      }
    }

    setIsLoaded(true);
  }, [track]);
  useEffect(() => {
    let _itemCatch = 0;

    cart_list.forEach((element) => {
      if (element.id === id) {
        _itemCatch = element.id;
        return;
      }
    });
    dispatch(setCartTextFromReducer({ surrogate: _itemCatch, id: id }));
  }, [cart_list]);

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
                {cart_text} <FontAwesomeIcon icon={faShoppingCart} />
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
          <h2>Comments({track_comments.length})</h2>
        </div>
        <div className="track_comment_list">
          <ul className="comment_username">
            {track_comments.length > 1 ? (
              track_comments.map((comment) => (
                <li className="comment_content">
                  <div className="username">
                    <p>{comment.username}</p>
                  </div>
                  <div className="message">
                    <p>{comment.message}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No comments has been found</p>
            )}
          </ul>
        </div>
        {track !== null ? (
          <div className="track_comment_form">
            <div className="input">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                ref={messageRef}
                placeholder="Enter comment here"
              ></textarea>
            </div>
            <div className="buttons">
              <button onClick={handleSubmitComment}>Send Comment</button>
            </div>
          </div>
        ) : (
          <div className="track_comment_form">
            <p>Please signin for comment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTrackModel;
