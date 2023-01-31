import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { createSubrandditThunk } from "../../store/subranddit";

const CreatingSubrandditComponent = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newSubrandditData = {
      title: title,
      description: description,
      icon_url: iconUrl,
      banner_img: bannerImage,
    };
    return dispatch(createSubrandditThunk(newSubrandditData)).then(
      async (res) => {
        if (!res.errors) {
          setSubmitSuccess(true);
        } else {
          setErrors(Object.values(res.errors));
        }
      }
    );
  };
  return (
    <div className="subrandditPageContainer">
      <div className="subrandditFormContainer">
        <div className="createSubrandditTitle">Create a Subranddit:</div>
        <form className="subrandditForm" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="errorDiv" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>
            <span>Subranddit Title:</span>
            <input
              className="createSubrandditInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Description:</span>
            <textarea
              className="createSubrandditDescriptionInput"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Icon URL:</span>
            <input
              className="createSubrandditInput"
              type="text"
              placeholder="Icon URL"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
            />
          </label>
          <label>
            <span>Banner Image URL:</span>
            <input
              className="createSubrandditInput"
              type="text"
              placeholder="Banner Image URL"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
            />
          </label>
          <div className="create-button-div">
            <button className="create-button" type="submit">
              Create!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatingSubrandditComponent;
