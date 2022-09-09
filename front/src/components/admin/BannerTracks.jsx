// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios/index.js";
import TracksPaginatedForm from "./pagination/tracks/TracksPaginatedForm";
import checkIcon from "../../media/toast/checkIcon.svg";
import warningIcon from "../../media/toast/warningIcon.svg";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setSearchTracksFromReducer,
  resetDataToDeleteFromReducer,
  setTrackToAddFromReducer,
} from "../../reducer/slices/memberSlice";
import { setToastItemToReducer } from "../../reducer/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

// ||||||||||||||||||||||| Banner Users |||||||||||||||||||||||||

const BannerTracks = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Hooks*
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [media, setMedia] = useState("");
  const [tag, setTag] = useState("");
  const [bpm, setBpm] = useState("");

  const modalRef = useRef(null);
  const updateModalRef = useRef(null);
  const addModalRef = useRef(null);
  const bodyRef = document.body;

  // Redux
  const { search_tracks, trackToDelete, trackToUpdate, canAddTrack } =
    useSelector((state) => state.memberReducer);
  const { toast_list, check_color, warning_color } = useSelector(
    (state) => state.toastReducer
  );
  const dispatch = useDispatch();

  // Functions
  const handleSearchChange = (e) => {
    let value = e;
    dispatch(setSearchTracksFromReducer(value));
  };
  const handleDeleteFromSubmit = async (e) => {
    if (!e) {
      dispatch(resetDataToDeleteFromReducer(null));
      modalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    } else {
      await axios
        .post("/api/member/tracks/delete", {
          id: trackToDelete.id,
        })
        .then((res) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Success",
            description: res.data.message,
            backgroundColor: check_color,
            icon: checkIcon,
          };

          dispatch(setToastItemToReducer(toast_item));

          dispatch(resetDataToDeleteFromReducer(null));
          modalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Warning",
            description: err.response.data.message,
            backgroundColor: warning_color,
            icon: warningIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          dispatch(resetDataToDeleteFromReducer(null));
          modalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";
        });
    }
  };
  const handleAddTrack = () => {
    dispatch(setTrackToAddFromReducer(true));
  };
  const handleAddFromSubmit = async (e) => {
    if (!e) {
      dispatch(resetDataToDeleteFromReducer(null));
      addModalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    } else {
      await axios
        .post("/api/member/tracks/add", {
          title: title,
          image: image,
          media: media,
          tag: tag,
          time: "nan",
          bpm: bpm,
        })
        .then((res) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Success",
            description: res.data.message,
            backgroundColor: check_color,
            icon: checkIcon,
          };

          setTitle(null);
          setImage(null);
          setMedia(null);
          setTag(null);
          setBpm(null);

          dispatch(setToastItemToReducer(toast_item));
          dispatch(resetDataToDeleteFromReducer(null));

          addModalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          const toast_item = {
            id: toast_list.length + 1,
            title: "Warning",
            description: err.response.data.message,
            backgroundColor: warning_color,
            icon: warningIcon,
          };

          dispatch(setToastItemToReducer(toast_item));
          dispatch(resetDataToDeleteFromReducer(null));
          addModalRef.current.style.display = "none";
          bodyRef.style.overflow = "scroll";
        });
    }
  };
  const handleUpdateFromSubmit = async (e) => {
    let trackMedia = new Audio(media);
    let trackDuration = "";
    let durationMinutes = "";
    let durationSecond = "";
    let secondsWithLeadingZero = "";

    trackMedia.preload = "metadata";

    trackMedia.addEventListener("loadedmetadata", async () => {
      durationMinutes = Math.floor(trackMedia.duration / 60);
      durationSecond = Math.floor(trackMedia.duration % 60);
      secondsWithLeadingZero =
        durationSecond < 10 ? `0${durationSecond}` : `${durationSecond}`;
      trackDuration = `${durationMinutes}:${secondsWithLeadingZero}`;

      if (!e) {
        dispatch(resetDataToDeleteFromReducer(null));
        updateModalRef.current.style.display = "none";
        bodyRef.style.overflow = "scroll";
      } else {
        await axios
          .post("/api/member/tracks/update", {
            id: trackToUpdate.id,
            title: title,
            image: image,
            media: media,
            tag: tag,
            time: trackDuration,
            bpm: bpm,
          })
          .then((res) => {
            const toast_item = {
              id: toast_list.length + 1,
              title: "Success",
              description: res.data.message,
              backgroundColor: check_color,
              icon: checkIcon,
            };

            setTitle(null);
            setImage(null);
            setMedia(null);
            setTag(null);
            setBpm(null);

            dispatch(setToastItemToReducer(toast_item));
            dispatch(resetDataToDeleteFromReducer(null));

            updateModalRef.current.style.display = "none";
            bodyRef.style.overflow = "scroll";

            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((err) => {
            const toast_item = {
              id: toast_list.length + 1,
              title: "Warning",
              description: err.response.data.message,
              backgroundColor: warning_color,
              icon: warningIcon,
            };

            dispatch(setToastItemToReducer(toast_item));
            dispatch(resetDataToDeleteFromReducer(null));
            updateModalRef.current.style.display = "none";
            bodyRef.style.overflow = "scroll";
          });
      }
    });
  };

  useEffect(() => {
    if (trackToDelete !== null) {
      modalRef.current.style.display = "flex";
      bodyRef.style.overflow = "hidden";
    } else {
      modalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    }
  }, [trackToDelete]);
  useEffect(() => {
    if (trackToUpdate !== null) {
      setTitle(trackToUpdate.title);
      setImage(trackToUpdate.image);
      setMedia(trackToUpdate.media);
      setTag(trackToUpdate.tag);
      setBpm(trackToUpdate.bpm);
      updateModalRef.current.style.display = "flex";
      bodyRef.style.overflow = "hidden";
    } else {
      setTitle(null);
      setImage(null);
      setMedia(null);
      setTag(null);
      setBpm(null);
      updateModalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    }
  }, [trackToUpdate]);
  useEffect(() => {
    setTitle(null);
    setImage(null);
    setMedia(null);
    setTag(null);
    setBpm(null);

    if (canAddTrack) {
      addModalRef.current.style.display = "flex";
      bodyRef.style.overflow = "hidden";
    } else {
      addModalRef.current.style.display = "none";
      bodyRef.style.overflow = "scroll";
    }
  }, [canAddTrack]);

  return (
    <>
      <section className="banner_tracks">
        <div className="search_form">
          <div className="input">
            <label htmlFor="search" className="search_icon">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search track tag"
              value={search_tracks}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="button">
            <button onClick={handleAddTrack}>Add Track</button>
          </div>
        </div>
        <TracksPaginatedForm />
      </section>
      <div className="modal" ref={modalRef}>
        <div className="modal_content">
          <div className="modal_content_title">
            <h3>Are you sure to delete this user ?</h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="button">
              <button
                type="submit"
                onClick={() => handleDeleteFromSubmit(true)}
              >
                Yes
              </button>
            </div>
            <div className="button">
              <button
                type="submit"
                onClick={() => handleDeleteFromSubmit(false)}
              >
                No
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="add_form_modal" ref={addModalRef}>
        <div className="modal_content">
          <div className="modal_content_title">
            <h3>Add New Tracks Form</h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="first">
              <div className="input">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Enter image here"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="media"
                  id="media"
                  placeholder="Enter media link here"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Enter tag here"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="bpm"
                  id="bpm"
                  placeholder="Enter bpm here"
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                />
              </div>
            </div>
            <div className="second">
              <div className="button">
                <button type="submit" onClick={() => handleAddFromSubmit(true)}>
                  Create
                </button>
              </div>
              <div className="button">
                <button
                  type="submit"
                  onClick={() => handleAddFromSubmit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="update_form_modal" ref={updateModalRef}>
        <div className="modal_content">
          <div className="modal_content_title">
            <h3>Add New Tracks Form</h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="first">
              <div className="input">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Enter image url here"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="media"
                  id="media"
                  placeholder="Enter media url here"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Enter tag here"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  name="bpm"
                  id="bpm"
                  placeholder="Enter bpm here"
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                />
              </div>
            </div>
            <div className="second">
              <div className="button">
                <button
                  type="submit"
                  onClick={() => handleUpdateFromSubmit(true)}
                >
                  Update
                </button>
              </div>
              <div className="button">
                <button
                  type="submit"
                  onClick={() => handleUpdateFromSubmit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BannerTracks;
