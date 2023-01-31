import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginModal';
import SignUpForm from '../auth/SignUpForm'
import "./NavBar.css";
import ProfileButtonComponent from './Profile';

const NavBarComponent = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session?.user);
  const [loginFormModalIsOpen, setLoginFormModalIsOpen] = useState(false);

  const signUpPage = (subrandditId) => {
    let path = `/sign-up`;
    history.push(path);
  };
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="rightNav">
          <ProfileButtonComponent user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div id="rightNav">
        <button className="signUpButton" onClick={signUpPage}>
          {" "}
          Sign up
        </button>
        <SignUpForm

        />
        <button
          className="signInButton"
          onClick={() => setLoginFormModalIsOpen(true)}
        >
          Log In
        </button>
        <LoginFormModal
          isOpen={loginFormModalIsOpen}
          modalToggle={setLoginFormModalIsOpen}
        />
      </div>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBarComponent;
