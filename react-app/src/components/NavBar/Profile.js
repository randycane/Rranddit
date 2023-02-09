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
    <>
      {userIsLoggedIn && (
      <div className="profile-right-side" onClick={openMenu}>
        <div className="profile-below">
          <div className="menu-profile">
            <div className="user-icon">
              <img className="icon-gundam" src="https://gundamnews.org/wp-content/uploads/2022/11/Mobile-Fighter-G-Gundam-04-BDRip-1440x1080p-x265-HEVC-FLACx2-2.0x2Dual-Audiosxales.mkv_20220505_224208.540-1024x768.jpg" alt='default-user'></img>
            </div>
            <div className="myself">{user.username}</div>
          </div>
        </div>
        {showMenu && (
          <div className="menu-shown">
            <div className="comm"> {`Welcome, ${user.username}!`}</div>
            <Link
              className="comm-out"
              to={`/user/${user.id}`}
            >
              Your Profile
            </Link>
            <div className="comm-out" onClick={logout}>
              Log out
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );
}

export default ProfileButtonComponent;
