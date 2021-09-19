// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setCartItemToReducer,
  resetCartItemToReducer,
  addItemToReducerList,
} from "../../reducer/slices/cartSlice";

// ||||||||||||||||||||||| SingleTrackModel |||||||||||||||||||||||||

const ShoppingCartModal = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleCartBtn = () => {
    dispatch(resetCartItemToReducer());

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
      modalRef.current.style.display = "none";
    }
  };

  const handlAddCartItem = (e) => {
    e.preventDefault();
    console.log(e.target.value.price);

    dispatch(
      addItemToReducerList({
        licensing: e.target.value.licensing,
        price: e.target.value.price,
      })
    );
    dispatch(resetCartItemToReducer());

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
      modalRef.current.style.display = "none";
    }
  };

  return (
    <div className="modale_cart" ref={modalRef}>
      <div className="content">
        <div className="content_header">
          <p>What type of license do you want ?</p>
          <button onClick={handleCartBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form className="content_body">
          <div className="input">
            <button
              value={{ licensing: "Non-Exclusive", price: "24.99" }}
              onClick={handlAddCartItem.bind(this)}
            >
              Non-Exclusive - €24.99
            </button>
          </div>
          <div className="input">
            <button
              value={{ licensing: "Exclusive", price: "44.99" }}
              onClick={handlAddCartItem.bind(this)}
            >
              Exclusive - €44.99
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
