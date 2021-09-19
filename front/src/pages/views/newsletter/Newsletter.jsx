import React from "react";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <main className="newsletter">
      <div className="content">
        <h1>Thanks you to register to our newsletter</h1>
        <p>
          Return to <Link to="/">home here</Link>
        </p>
      </div>
    </main>
  );
};

export default Newsletter;
