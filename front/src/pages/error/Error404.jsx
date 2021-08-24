import "../../styles/main/error/error404.scss";
import React from "react";

import { Link } from "react-router-dom";

const Error404 = () => {
  //Scroll To Top
  window.scrollTo(0, 0);
  
  return (
    <main className="error404">
      <div className="content">
        <div className="content_header">
          <h1>Error 404 - Page not found</h1>
        </div>
        <section className="error404_body">
          <p>
            Please return to <Link to="/">home page here.</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Error404;
