// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/cart/cart.scss";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { resetCartListToReducer } from "../../../reducer/slices/cartSlice";

// ||||||||||||||||||||||| SingleTrackModel |||||||||||||||||||||||||

const Cart = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const { cart_list } = useSelector((state) => state.cartReducer);

  return (
    <main className="cart">
      <div className="content">
        <div className="content_header">
          <h1>Your Cart</h1>
        </div>
        <section className="content_body">
          <section className="cart_body">
            <div className="cart_table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Licence</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  {cart_list.length > 0 ? (
                    cart_list.map((item) => (
                      <tr>
                        <td className="cart_table_body_Product">
                          <img src={item.image} alt="image" />
                          <p>{item.title}</p>
                        </td>
                        <td className="cart_table_body_licence">
                          <p>{item.licensing}</p>
                        </td>
                        <td className="cart_table_body_price">
                          <p>{item.price}</p>
                        </td>
                        <td className="cart_table_body_button">
                          <button>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Cart is empty</p>
                  )}
                </tbody>
              </table>
            </div>
            <div className="cart_total">
              <div className="delete_cart">
                <p onClick={() => dispatch(resetCartListToReducer())}>
                  Delete cart items
                </p>
              </div>
              <div className="total">
                <p>Total</p>
                <p className="total_number">€44.99</p>
              </div>
              <div className="button">
                <button>Checkout Now</button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Cart;
