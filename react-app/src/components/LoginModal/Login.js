import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

import "./Login.css";

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
    // else {
    //   onClose();
    // }
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
    let path = `/sign-up`;
    history.push(path);
  };

  return (
    <div className="login-modal-div">
      <div className="login-welcome">
        <div className="hello-world">Welcome to Randdit</div>
      </div>
      <div className="innerLoginFormContainer">
        <form onSubmit={onLogin} className="loginForm">
          <div>
            {errors.map((error, index) => (
              <div className="errorDiv" key={index}>
                {error}
              </div>
            ))}
          </div>
          <div className="email-field-div">
            <input
              className="loginEmailInput"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="password-div">
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
              <button className="logging-in" type="submit">
                Log In
              </button>

              <button
                className="demo-user"
                type="submit"
                onClick={() => {
                  setEmail("demo@aa.io");
                  setPassword("password1");
                }}
              >
                Demo User
              </button>
            </div>
          </div>
        </form>
        <div className="need-accounts">
          <div>
            <div className="to-register">Need an Account?</div>
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
