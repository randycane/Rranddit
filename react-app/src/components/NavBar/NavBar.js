import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginModal';
import SignUpForm from '../auth/SignUpForm'
import SignupFormModal from "../auth/SignUpModal";
import "./NavBar.css";
import ProfileButtonComponent from './Profile';
import LoginModalComponent from "../LoginModal/Login";

// const NavBarComponent = ({ isLoaded }) => {
//   const history = useHistory();
//   const sessionUser = useSelector((state) => state?.session?.user);
//   const [loginFormModalIsOpen, setLoginFormModalIsOpen] = useState(false);

//   const signUpPage = (subrandditId) => {
//     let path = `/sign-up`;
//     history.push(path);
//   };
//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//         <div id="rightNav">
//           <ProfileButtonComponent user={sessionUser} />
//         </div>
//       </>
//     );
//   } else {
//     sessionLinks = (
//       <div id="rightNav">
//         <button className="signUpButton" onClick={signUpPage}>
//           {" "}
//           Sign up
//         </button>
//         <SignUpForm

//         />
//         <button
//           className="signInButton"
//           onClick={() => setLoginFormModalIsOpen(true)}
//         >
//           Log In
//         </button>
//         <LoginModalComponent
//           isOpen={loginFormModalIsOpen}
//           modalToggle={setLoginFormModalIsOpen}
//         />
//       </div>
//     );
//   }

//   return (
//     <nav>
//       <div id="navBarContainer">
//         <div id="navBar">
//           <div id="logo_div">
//             <NavLink exact to="/">
//             <div className="home-icon">
//             <img src="https://res.cloudinary.com/teepublic/image/private/s--rdSMZL_M--/c_fit,g_north_west,h_711,w_840/co_484849,e_outline:40/co_484849,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1592405498/production/designs/11418386_0.jpg" alt="nope"></img>
//             <div className="home-text">
//               Randdit
//               </div>
//             </div>
//             </NavLink>
//           </div>
//           {isLoaded && sessionLinks}
//         </div>
//       </div>
//     </nav>
//   );
// }

function NavBarComponent() {

  const userIsLoggedIn = useSelector((state) => state?.session?.user)


  let sessionLinks;

  if (userIsLoggedIn) {
    sessionLinks = (
      <ProfileButtonComponent user={userIsLoggedIn}/>
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        </>
    )
  }
  return (
    <div className="top">
        <div className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className="home-icon">
            <img src="https://res.cloudinary.com/teepublic/image/private/s--rdSMZL_M--/c_fit,g_north_west,h_711,w_840/co_484849,e_outline:40/co_484849,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1592405498/production/designs/11418386_0.jpg" alt="nope"></img>
            <div className="home-text">
              Randdit
              </div>
            </div>
        </NavLink>
            </div>
            <div className="page-title">
                Where all weebs can live in harmony.
      </div>

      <div className="get-on-sib">
        {sessionLinks}
        </div>

    </div>
  );
}

export default NavBarComponent;
