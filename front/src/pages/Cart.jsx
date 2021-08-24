import "../styles/main/cart/cart.scss";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { addCartItem, deleteCartItem, resetCart } from "../slices/cartSlice";
import CartItemModel from "../components/cart/CartItemModel";

const Cart = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const [active, setActive] = useState(0);

  const { cartSlice } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

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
                  {cartSlice.map((cart) => (
                    <CartItemModel cart={cart} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart_total">
              <div className="delete_cart">
                <p>Delete cart items</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p className="total_number">€29.99</p>
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
