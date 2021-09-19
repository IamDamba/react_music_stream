import React from "react";

import "../styles/components/accordion/accordion.scss";

const Accordion = ({ title, text, active, setActive, id }) => {
  const SetActivation = () => {
    if (active !== id) {
      setActive(id);
    } else {
      setActive(0);
    }
  };

  return (
    <div className="accordion_item">
      <div className="accordion_item_header" onClick={SetActivation}>
        <h3>{title}</h3>
        <div
          className={
            "accordion_item_header_btn " + (active === id ? "open" : "close")
          }
        >
          <span className="span_1"></span>
          <span className="span_2"></span>
        </div>
      </div>
      <div className="accordion_item_body">
        <h4>Read Conditions</h4>
        <div
          className={
            "accordion_item_body_text " + (active === id ? "" : "hide")
          }
        >
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
