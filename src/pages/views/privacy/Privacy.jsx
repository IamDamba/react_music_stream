import React, { useState, useEffect } from "react";

import "../../../styles/main/privacy/privacy.scss";
import Accordion from "../../../components/accordion/Accordion";

const Privacy = () => {
  // Variables
  const [active, setActive] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  //Function
  useEffect(() => {
    //Scroll To Top
    window.scrollTo(0, 0);
    setCanScroll(true);
  }, [!canScroll]);

  return (
    <main className="privacy">
      <div className="content">
        <div className="content_header">
          <h1>Privacy Policy</h1>
          <h2>Here is the privacy policy of the website.</h2>
          <div className="privacy_list">
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
export default Privacy;
