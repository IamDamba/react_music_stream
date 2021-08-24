import React from "react";

const CartItemModel = ({ cart }) => {
  return (
    <tr>
      <td className="cart_table_body_Product">
        <img src={cart.image} alt="image" />
        <p>{cart.name}</p>
      </td>
      <td className="cart_table_body_licence">
        <p>{cart.license}</p>
      </td>
      <td className="cart_table_body_price">
        <p>€{cart.price}</p>
      </td>
      <td className="cart_table_body_button">
        <button>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default CartItemModel;
