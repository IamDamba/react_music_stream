import React, { useEffect, useState } from "react";
import UserTableModel from "./UserTableModel";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const UsersPaginatedForm = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [isData, setIsData] = useState(false);

  const { search_users } = useSelector((state) => state.memberReducer);

  const FetchUsers = async () => {
    let offset = limit * currentPage - limit;

    await axios
      .get(`/api/member/users?search=${search_users}`)
      .then((res) => {
        let result = res.data.result;

        if (search_users.length > 0) {
          setIsData(true);
          setData(result);
          setCurrentData(result.slice(0, limit * currentPage));
        } else {
          setIsData(true);
          setData(result);
          setCurrentData(result.slice(offset, limit * currentPage));
        }
      })
      .catch((err) => {});
  };
  const pageNumber = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    FetchUsers();
  }, [search_users.length]);

  useEffect(() => {
    data.length > 0 ? setIsData(true) : setIsData(false);
    let offset = limit * currentPage - limit;
    setCurrentData(data.slice(offset, limit * currentPage));
  }, [currentPage]);

  const pageCount = Math.ceil(data.length / limit);

  return (
    <>
      <div className="users_list_table">
        <table>
          <thead>
            <tr>
              <th className="thead_id">ID</th>
              <th className="thead_username">Username</th>
              <th className="thead_email">Email</th>
              <th className="thead_link"></th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {isData !== false ? (
              currentData.map((user, key) => (
                <UserTableModel key={key} data={user} />
              ))
            ) : (
              <p>No data was found.</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="users_list_pagination">
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          breakLabel={"..."}
          breakClassName={"_break"}
          pageCount={pageCount}
          onPageChange={pageNumber.bind(this)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default UsersPaginatedForm;
