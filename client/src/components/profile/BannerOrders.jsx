import React, { useEffect, useState } from "react";
import axios from "../../axios/index.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setOrdersToReducer } from "../../reducer/slices/userSlice";

const BannerOrders = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const { token, orders } = useSelector((state) => state.userReducer);

  const fetchData = async () => {
    await axios
      .post("/api/userorders", {
        token: token,
      })
      .then((res) => {
        console.log(res.data.results);
        dispatch(setOrdersToReducer(res.data.results));
        setIsDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isDataLoaded)
    return (
      <div className="orders">
        <div className="second">
          <table className="list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Data is loading</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <div className="orders">
      <div className="second">
        <table className="list">
          <thead>
            <tr>
              <th className="thead_id">ID</th>
              <th className="thead_total">Total</th>
              <th className="thead_state">State</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {orders.map((order) => (
              <tr className="items">
                <td className="item_id">
                  <p>{order.id}</p>
                </td>
                <td className="item_total">
                  <p>{order.total}</p>
                </td>
                <td className="item_state">
                  <p>{order.state}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerOrders;
