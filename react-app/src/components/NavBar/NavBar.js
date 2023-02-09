import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginFormModal from "../LoginModal";
import SignUpForm from "../auth/SignUpForm";
import SignupFormModal from "../auth/SignUpModal";
import "./NavBar.css";
import ProfileButtonComponent from "./Profile";
import LoginModalComponent from "../LoginModal/Login";
import LoginNewPage from "../LoginModal/Login";

const NavBarComponent = ({ isLoaded }) => {
  const history = useHistory();
  const UserIsLoggedIn = useSelector((state) => state?.session?.user);


  const signUpPage = (subrandditId) => {
    let path = `/sign-up`;
    history.push(path);
  };

  const loggingInPage = (subrandditId) => {
    let path = `/login`;
    history.push(path);
  };

  let sessionLinks;
  if (UserIsLoggedIn) {
    sessionLinks = (
      <>
        <div className="profile-button">
          <ProfileButtonComponent user={UserIsLoggedIn} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div className="navigating-bar">
        <button className="signing-up-right" onClick={signUpPage}>
          Sign Up
        </button>
        <button
          className="logging-in-right" onClick={loggingInPage}>
          Log In
        </button>
      </div>
    );
  }


  return (
    <div className="whole-navi">
      <div className="navi-container">
        <div className="nav-bar">
          <div className="logo-div">
            <NavLink exact to="/">
              <img
                className="home-icon"
                src="https://res.cloudinary.com/teepublic/image/private/s--rdSMZL_M--/c_fit,g_north_west,h_711,w_840/co_484849,e_outline:40/co_484849,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1592405498/production/designs/11418386_0.jpg"
                alt="nope"
              ></img>
              <div className="home-text">Randdit</div>
            </NavLink>
          </div>
          <div className="page-title">Where all weebs can live in harmony.</div>
          <div className="get-on-sib">{isLoaded && sessionLinks}</div>
        </div>
      </div>
    </div>
  );


};

export default NavBarComponent;
