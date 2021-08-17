import "../styles/main/cart/cart.scss";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [active, setActive] = useState(0);

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
                  <tr>
                    <td className="cart_table_body_Product">
                      <img src="" alt="" />
                      <p>Track 1</p>
                    </td>
                    <td className="cart_table_body_licence">
                      <p>Standard Licence</p>
                    </td>
                    <td className="cart_table_body_price">
                      <p>€29.99</p>
                    </td>
                    <td className="cart_table_body_button">
                      <button>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart_table_body_Product">
                      <img src="" alt="" />
                      <p>Track 1</p>
                    </td>
                    <td className="cart_table_body_licence">
                      <p>Standard Licence</p>
                    </td>
                    <td className="cart_table_body_price">
                      <p>€29.99</p>
                    </td>
                    <td className="cart_table_body_button">
                      <button>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart_table_body_Product">
                      <img src="" alt="" />
                      <p>Track 1</p>
                    </td>
                    <td className="cart_table_body_licence">
                      <p>Standard Licence</p>
                    </td>
                    <td className="cart_table_body_price">
                      <p>€29.99</p>
                    </td>
                    <td className="cart_table_body_button">
                      <button>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
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
