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
        <div className="right-navi">
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
        <SignUpForm />
        <button
          className="signInButton"
          onClick={() => setLoginFormModalIsOpen(true)}
        >
          Log In
        </button>
        <LoginModalComponent
          isOpen={loginFormModalIsOpen}
          modalToggle={setLoginFormModalIsOpen}
        />
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

  // function NavBarComponent() {

  //   const userIsLoggedIn = useSelector((state) => state?.session?.user)

  //   let sessionLinks;

  //   if (userIsLoggedIn) {
  //     sessionLinks = (
  //       <ProfileButtonComponent user={userIsLoggedIn}/>
  //     )
  //   } else {
  //     sessionLinks = (
  //       <>
  //         <LoginFormModal />
  //         <SignupFormModal />
  //         </>
  //     )
  //   }
  //   return (
  //     <div className="top">
  //         <div className="home">
  //           <NavLink to='/' exact={true} activeClassName='active'>
  //             <div className="home-icon">
  //             <img className="img-home" src="https://res.cloudinary.com/teepublic/image/private/s--rdSMZL_M--/c_fit,g_north_west,h_711,w_840/co_484849,e_outline:40/co_484849,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1592405498/production/designs/11418386_0.jpg" alt="nope"></img>
  //             <div className="home-text">
  //               Randdit
  //               </div>
  //             </div>
  //         </NavLink>
  //             </div>
  //             <div className="page-title">
  //                 Where all weebs can live in harmony.
  //       </div>

  //       <div className="get-on-sib">
  //         {sessionLinks}
  //         </div>

  //     </div>
  //   );
};

export default NavBarComponent;
