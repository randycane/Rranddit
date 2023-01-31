import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";

function ProfileButtonComponent({ user }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
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
    <>
      <nav className="profileDropdownDiv" onClick={openMenu}>
        <div className="profileDropdown">
          <div className="menu_drop">
            <span>{user.username}</span>
          </div>
        </div>
        {showMenu && (
          <div id="menu">
            <div className="loggedInUser"> {`Greetings, ${user.username}`}</div>
            <Link
              className="profilePageDropdown"
              to={`/user/${user.id}`}
              id="dropDown1"
            >
              Profile
            </Link>
            <div onClick={logout} id="dropDown2">
              Log out
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default ProfileButtonComponent;
