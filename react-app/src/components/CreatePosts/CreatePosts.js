import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { WriteAPostThunk } from "../../store/post";
import { getAllSubrandditsThunk } from "../../store/subranddit";

import "./CreatePost.css";

const CreatingPostComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const subranddits = useSelector((state) => Object.values(state?.subranddits));

  //const UserIsLoggedIn = useSelector((state) => state.session.user);
  const urlParams = new URLSearchParams(window.location.search);
  let subrandditId = Number(urlParams.get("subranddit_id"));
  subrandditId = subrandditId > 0 ? subrandditId : 1;

  const [postTitle, setPostTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [text, setText] = useState("");
  const [subranddit, setSubranddit] = useState(subrandditId);

  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [subrandditsLoaded, setSubrandditsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSubrandditsThunk()).then(() => {
      setSubrandditsLoaded(true);
    });
  }, [dispatch]);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }


  const handleSubrandditChange = (e) => {
    setSubranddit(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    formData.append("post_title", postTitle);
    formData.append("subranddit_id", subranddit);
    formData.append("post_text", text);
    formData.append("img_url", imgUrl);


    return dispatch(WriteAPostThunk(formData)).then(async (response) => {
      if (!response.errors) {
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(response.errors));
      }
    });
  };


  return (
    <div className="post-page-container">
      <div className="posting-container">
        <div className="create-post">Create a Post</div>
        <ul>
          {errors.map((error, idx) => (
            <li className="errorDiv" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div className="sub-dropdown">
          <select className="sub-select" onChange={handleSubrandditChange}>
            {subrandditsLoaded &&
              subranddits.map((subranddit) => {
                return (
                  <option
                    key={subranddit.id}
                    value={subranddit.id}
                    selected={subranddit.id === subrandditId}
                  >
                    r/{subranddit.title}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mainFormContainer">
          <div></div>
          <br />
          <div className="create-input">
            <form className="postsCreate" onSubmit={handleSubmit}>
              <div>
                <label className="createTitle">
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label className="createTitle">
                  <textarea
                    className="createTextInputBox"
                    type="text"
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </label>
              </div>
              <label className="img-form">
                <span> Image (optional): </span>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </label>
              <div className="createPostButtonDiv">
                <button className="createPostButton" type="submit">
                  Create new post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="side-container">
        <div className="post-rules">
          <span>Posting to Randdit</span>
        </div>
        <ol>
          <li className="rule-list">Remember to be human</li>
          <li className="rule-list">Behave like a moral person</li>
          <li className="rule-list">Look out for and avoid duplicate posts</li>
          <li className="rule-list">Report any site issues to the developer</li>
        </ol>
      </div>
    </div>
  );
};

export default CreatingPostComponent;
