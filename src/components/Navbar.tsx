import React, { useState, useContext } from "react";
import Logo from "../images/logo.svg";
import Register from "./Auth/Register";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
const Navbar = () => {
  const { isActive, logout } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<string>("");
  const handleClick = (e: any) => {
    if (e.target.getAttribute("data-auth") === "login") {
      setShowAuth("login");
    } else if (e.target.getAttribute("data-auth") === "signup") {
      setShowAuth("signup");
    }
  };
  const showBox = () => {
    if (showAuth === "signup") {
      return (
        <Register
          title={"Sign Up"}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
        />
      );
    } else if (showAuth === "login") {
      return (
        <Register
          title={"Login"}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
        />
      );
    } else return;
  };
  return (
    <div className="mynav">
      <div className="container">
        <div className="nav-inner-container">
          <div className="logo">
            <img src={Logo} alt="the website logo" />
          </div>
          <div className="mynav-actions">
            {!isActive ? (
              <>
                <button
                  className="login-cta"
                  data-auth="login"
                  onClick={(e) => handleClick(e)}
                >
                  Login
                </button>
                <button
                  className="signup-cta"
                  data-auth="signup"
                  onClick={(e) => handleClick(e)}
                >
                  Sign Up
                </button>
                {showBox()}
              </>
            ) : (
              <button className="login-cta" onClick={(e) => logout()}>
                Logout
              </button>
            )}
          </div>
          <div
            className={`mobile-nav-btn ${show ? "change-look" : ""}`}
            onClick={(e) => setShow(!show)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className={`mynav-mobile ${show ? "show-mobile-menu" : ""}`}>
            <ul className="list-unstyled m-0">
              <li className="mynav-mobile-item m-0">
                <Link to="/login">Login</Link>
              </li>
              <li className="mynav-mobile-item m-0">
                <Link to="/register">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
