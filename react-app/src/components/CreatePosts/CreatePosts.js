import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { WriteAPostThunk } from "../../store/post";
import { getAllSubrandditsThunk } from "../../store/subranddit";

const CreatingPostComponent = () => {
  const dispatch = useDispatch();
  const subranddits = useSelector((state) => Object.values(state?.subranddits));

  const urlParams = new URLSearchParams(window.location.search);
  let subrandditId = Number(urlParams.get("subranddit_id"));
  subrandditId = subrandditId > 0 ? subrandditId : 1;

  const [postTitle, setPostTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    formData.append("post_title", postTitle);
    formData.append("subranddit_id", subranddit);
    formData.append("post_text", text);
    formData.append("image", image);
    formData.append("img_url", imgUrl);

    return dispatch(WriteAPostThunk(formData)).then(async (res) => {
      if (!res.errors) {
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  const handleSubrandditChange = (e) => {
    setSubranddit(e.target.value);
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
                    r/{subranddit.name}
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
              <label className="form">
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
          <li className="rule-list">Look for the original source of content</li>
          <li className="rule-list">Report any bugs to the developer</li>
        </ol>
      </div>
    </div>
  );
};

export default CreatingPostComponent;
