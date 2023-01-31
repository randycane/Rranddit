import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

function ProfileButtonComponent({ user }) {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div className="nav-bar-right">
      {userIsLoggedIn && (
        <button className="DropDownMenuIcon" onClick={openMenu}>
          <i className="fas fa-bars" /> <i className="fas fa-user-circle" />
        </button>
      )}

      {showMenu && (
        <div className="profile-dropdown">
          <div className="comm">Welcome, {user.username}!</div>
          <div className="comm">Profile: {user.email}</div>
          {userIsLoggedIn && (
            <div className="get-out">
              <LogoutButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButtonComponent;
