import React, { useEffect, useRef, useState } from "react";
import "../styles/header/header.scss";
import Logo from "../media/logo.svg";

import { Link } from "react-router-dom";

const Header = () => {
  const [scrollYPos, setScrollYPos] = useState(0);
  const headerRef = useRef(null);

  const bgColor = "transparent";
  const headerColor = "#420000";

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setScrollYPos(scrolled);
  };

  window.addEventListener("scroll", listenToScroll);

  useEffect(() => {
    if (scrollYPos > 0) {
      console.log(scrollYPos);
      headerRef.current.style.backgroundColor = headerColor;
    } else {
      headerRef.current.style.backgroundColor = bgColor;
    }
  }, [scrollYPos]);

  return (
    <header ref={headerRef}>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="ham">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav>
        <ul className="menu">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/tracks">Tracks</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li className="btn">
            <a href="/signin">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
