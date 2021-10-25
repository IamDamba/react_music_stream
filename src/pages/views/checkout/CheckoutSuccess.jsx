import '../../../styles/main/checkout/checkout.scss';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Error404 from "../error404/Error404";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCartListToReducer } from "../../../reducer/slices/cartSlice";

const CheckoutSuccess = () => {
  const [isDataMatch, setIsDataMatch] = useState(false);
  const { transaction_id } = useParams();

  const dispatch = useDispatch();

  const dataLoaded = async () => {
    await axios
      .post("https://music-stream-serverside.herokuapp.com/api/checkout/matching_id", {
        transaction_id: transaction_id,
      })
      .then((res) => {
        setIsDataMatch(res.data.result);
        if (res.data.result) {
          dispatch(resetCartListToReducer());
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    dataLoaded();
  }, []);

  if (!isDataMatch) {
    return <Error404 />;
  }

  return (
    <main className="checkout_success">
      <div className="content">
        <div className="content_header">
          <h1>Thanks you for purchase</h1>
        </div>
        <div className="content_body">
          <p>We are waiting you for more search of our tracks.</p>
          <Link to="/">Click here to return home.</Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
