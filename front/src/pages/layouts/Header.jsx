import "../../styles/header/header.scss";
import React, { useRef } from "react";
import Logo from "../../media/logo/logo.svg";

import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // Variables
  const hamRef = useRef(null);
  const NavRef = useRef(null);

  const history = useHistory();
  const { token } = useSelector((state) => state.userReducer);

  const handleHam = () => {
    if (hamRef.current.classList.contains("inactive")) {
      hamRef.current.classList.remove("inactive");
      hamRef.current.classList.add("active");
    } else {
      hamRef.current.classList.remove("active");
      hamRef.current.classList.add("inactive");
    }

    if (NavRef.current.classList.contains("hide")) {
      NavRef.current.classList.remove("hide");
      NavRef.current.classList.add("show");
    } else {
      NavRef.current.classList.remove("show");
      NavRef.current.classList.add("hide");
    }
  };

  const handleLink = () => {
    if (hamRef.current.classList.contains("active")) {
      hamRef.current.classList.remove("active");
      hamRef.current.classList.add("inactive");
    }

    if (NavRef.current.classList.contains("show")) {
      NavRef.current.classList.remove("show");
      NavRef.current.classList.add("hide");
    }
  };

  const handleSigninLink = () => {
    let a = document.createElement("a");
    a.href = "/signin";
    a.click();
  };

  const handleProfileLink = () => {
    let a = document.createElement("a");
    a.href = "/profile";
    a.click();
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 800) {
      console.log("desktop");
    } else {
    }
  });

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="ham inactive" ref={hamRef} onClick={handleHam}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="hide" ref={NavRef}>
        <ul className="menu">
          <li>
            <Link to="/about" onClick={handleLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="/tracks" onClick={handleLink}>
              Tracks
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLink}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={handleLink}>
              Cart
            </Link>
          </li>
          {token !== null ? (
            <li className="btn" onClick={handleProfileLink}>
              <a href="/profile">Profile</a>
            </li>
          ) : (
            <li className="btn" onClick={handleSigninLink}>
              <a href="/signin">Sign In</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
