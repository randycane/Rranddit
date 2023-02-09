import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

import "./Login.css";

const LoginNewPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state?.session?.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
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
    let path = `/sign-up`;
    history.push(path);
  };

  return (
    <div className="logging-in-page">
      <div className="login-welcome">
        <div className="hello-world">Welcome back to Randdit!</div>
      </div>
      <div className="lelouch">
        <img className="geass" src="https://i.pinimg.com/736x/f6/94/29/f694295bc706250116b2d31a29a75bdc.jpg" alt="neh"></img>
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

export default LoginNewPage;
