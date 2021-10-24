import React, { useEffect, useState } from "react";
import InvoicesTableModel from "./InvoicesTableModel.jsx";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InvoicesPaginatedForm = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [isData, setIsData] = useState(false);

  const { search_invoice } = useSelector((state) => state.memberReducer);

  const FetchInvoices = async () => {
    let offset = limit * currentPage - limit;

    await axios
      .get(`/api/member/invoices?search=${search_invoice}`)
      .then((res) => {
        let result = res.data.result;

        if (search_invoice.length > 0) {
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
    FetchInvoices();
  }, [search_invoice.length]);

  useEffect(() => {
    data.length > 0 ? setIsData(true) : setIsData(false);
    let offset = limit * currentPage - limit;
    setCurrentData(data.slice(offset, limit * currentPage));
  }, [currentPage]);

  const pageCount = Math.ceil(data.length / limit);

  return (
    <>
      <div className="invoices_list_table">
        <table>
          <thead>
            <tr>
              <th className="thead_id">ID</th>
              <th className="thead_user_id">User ID</th>
              <th className="thead_status">Status</th>
              <th className="thead_total">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {isData !== false ? (
              currentData.map((invoice, key) => (
                <InvoicesTableModel key={key} data={invoice} />
              ))
            ) : (
              <p>No data was found.</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="invoices_list_pagination">
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

export default InvoicesPaginatedForm;
