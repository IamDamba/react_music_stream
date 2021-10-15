// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import "../../../styles/main/cart/cart.scss";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetCartListToReducer,
  removeCartListItemToReducer,
} from "../../../reducer/slices/cartSlice";
import axios from "axios";

// ||||||||||||||||||||||| SingleTrackModel |||||||||||||||||||||||||

const Cart = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  const [cartTotal, setCartTotal] = useState(0.0);

  const dispatch = useDispatch();
  const { cart_list } = useSelector((state) => state.cartReducer);
  const { token } = useSelector((state) => state.userReducer);

  const handleRemoveItem = (e) => {
    console.log(e);
    dispatch(removeCartListItemToReducer(e));
  };
  const handleCheckout = async () => {
    let items = {
      data: [],
      total: 0,
    };
    let tracks_items = [];
    let _total = 0;
    for (let track in cart_list) {
      let item = null;
      if (cart_list[track].id >= 10) {
        item = {
          name: cart_list[track].title,
          sku: "0" + cart_list[track].id.toString(),
          price: cart_list[track].price.toString(),
          currency: "EUR",
          quantity: 1,
        };
      } else if (cart_list[track].id >= 100) {
        item = {
          name: cart_list[track].title,
          sku: cart_list[track].id.toString(),
          price: cart_list[track].price.toString(),
          currency: "EUR",
          quantity: 1,
        };
      } else {
        item = {
          name: cart_list[track].title,
          sku: "00" + cart_list[track].id.toString(),
          price: cart_list[track].price.toString(),
          currency: "EUR",
          quantity: 1,
        };
      }

      items.data.push(item);
      items.total += parseFloat(cart_list[track].price);
    }
    for (let track in cart_list) {
      let item = null;

      item = {
        title: cart_list[track].title,
        id: cart_list[track].id,
        license: cart_list[track].licensing,
      };

      tracks_items.push(item);
    }

    if (token !== null) {
      console.log(token);
      await axios
        .post("/api/checkout", {
          token: token,
          data: items.data,
          total: items.total,
          track_list: tracks_items,
        })
        .then((res) => {
          let redirect_link = document.createElement("a");
          redirect_link.href = res.data.redirect;
          redirect_link.click();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Please signin before checkout.");
    }
  };

  useEffect(() => {
    let _catchTotal = 0;

    for (let i = 0; i < cart_list.length; i++) {
      _catchTotal += parseFloat(cart_list[i].price);
    }
    setCartTotal(_catchTotal);
  }, [cart_list]);

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
                    <th className="thead_product">Product</th>
                    <th className="thead_licence">Licence</th>
                    <th className="thead_price">Price</th>
                    <th className="thead_delete"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  {cart_list.length > 0 ? (
                    cart_list.map((item) => (
                      <tr key={item.id}>
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
                          <button onClick={() => handleRemoveItem(item.id)}>
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
                <p className="total_number">{cartTotal} €</p>
              </div>
              <div className="button">
                <button onClick={handleCheckout}>Checkout Now</button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Cart;
