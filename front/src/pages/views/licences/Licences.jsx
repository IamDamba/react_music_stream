import React, { useState } from "react";
import "../../../styles/main/licences/licences.scss";
import Accordion from "../../../components/Accordion";

const Licences = () => {
  //Scroll To Top
  window.scrollTo(0, 0);

  // Variables
  const [active, setActive] = useState(0);

  return (
    <main className="licences">
      <div className="content">
        <div className="content_header">
          <h1>Licencing Methods</h1>
          <h2>
            Here are all the licencing methods we provides to all of you, just
            choose wich one will fit you best.
          </h2>
          <div className="licences_list">
            <Accordion
              title="Title 1"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
              active={active}
              setActive={setActive}
              id={1}
            />
            <Accordion
              title="Title 2"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
              active={active}
              setActive={setActive}
              id={2}
            />
            <Accordion
              title="Title 3"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
              active={active}
              setActive={setActive}
              id={3}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Licences;
