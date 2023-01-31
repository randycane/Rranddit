import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

const LoginModalComponent = ({ onClose }) => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state?.session?.user);
    const dispatch = useDispatch();

    const onLogin = async (e, isDemoUser = false) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    if (user) {
      return <Redirect to="/" />;
    }

    const signUpPage = (subrandditId) => {
      onClose();
      let path = `/sign-up`;
      history.push(path);
    };

    return (
      <div className="loginFormContainer">

        <div className="loginWelcome">
          <span>Welcome to Randdit</span>
        </div>
        <div className="innerLoginFormContainer">
          <form onSubmit={onLogin} className="loginForm">
            <div>
              {errors.map((error, ind) => (
                <div className="errorDiv" key={ind}>
                  {" "}
                  - {error}
                </div>
              ))}
            </div>
            <div className="loginEmailDiv field">

              <input
                className="loginEmailInput"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className="loginPasswordDiv field">

              <input
                className="loginPasswordInput"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="loginButtonsDiv">
              <div className="loginDemoButtons">
                <button className="modalLoginButton" type="submit">
                  Login
                </button>

                <button
                  className="demoButton"
                  type="submit"
                  onClick={() => {
                    setEmail("demo@aa.io");
                    setPassword("password1");
                  }}
                >
                  {" "}
                  Demo User{" "}
                </button>
              </div>
            </div>
          </form>
          <div className="loginSignUpDiv">
            <div>
              <span>Need an Account?</span>
            </div>

            <button className="loginSignUpButton" onClick={signUpPage}>
              Sign Up
            </button>

          </div>
        </div>
      </div>
    );
  };

  export default LoginModalComponent;
