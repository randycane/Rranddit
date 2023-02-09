import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSubFromIdThunk, editSubThunk } from "../../store/subranddit";
import "./UpdateSub.css";

const UpdateSubrandditComponent = ({ onClose }) => {
  let { subrandditId } = useParams();
  subrandditId = Number(subrandditId);
  const dispatch = useDispatch();

  let subranddit = useSelector((state) => Object.values(state?.subranddits));
  subranddit = subranddit[0] ? subranddit[0] : subranddit;
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [subrandditLoaded, setSubrandditLoaded] = useState(false);

  useEffect(() => {
    if (subranddit.title) {
      setDescription(subranddit.description);
      setIconUrl(subranddit.icon_url);
      setBannerImage(subranddit.banner_img);
    }
  }, [subranddit]);

  useEffect(() => {
    dispatch(getSubFromIdThunk(subrandditId)).then(() => {
      setSubrandditLoaded(true);
    });
  }, [dispatch, subrandditId]);

  if (submitSuccess) {
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newSubrandditData = {
      id: subrandditId,
      title: subranddit.title,
      description: description,
      icon_url: iconUrl,
      banner_img: bannerImage,
    };
    return dispatch(editSubThunk(newSubrandditData))
    // .then(async (response) => {
    //   if (!response.errors) {
    //     setSubmitSuccess(true);
    //   } else {
    //     setErrors(Object.values(response.errors));
    //   }
    // });
    .then(setSubmitSuccess(true));
  };

  if (subrandditLoaded) {
    return (
      <div className="editSubredditFormContainer">
        <div className="innerEditSubredditFormContainer">
          <form className="subr-EditForm" onSubmit={handleSubmit}>
            <div className="editSubredditFormTitle">
              <span>Edit Subranddit:</span>
            </div>
            <ul>
              {errors.map((error, idx) => (
                <li className="errorDiv" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
            <div className="editFormInputContainer">
              <span>Description:</span>
              <label>
                <textarea
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <span>Icon URL:</span>
              <label>
                <input
                  type="text"
                  placeholder="(Optional)"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                />
              </label>
              <span>Banner Image URL:</span>
              <label>
                <input
                  type="text"
                  placeholder="(Optional)"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                />
              </label>
            </div>
            <div className="editSubrButtonDiv">
              <button className="editSubrButton" type="submit">
                Confirm Edit
              </button>
            </div>
          </form>
        </div>
        <div className="notice">
          <div className="notice-title">
            <span>For your information:</span>
          </div>
          <div className="edit-preview-notes">
            <span>
              *Empty or Broken images will recieve a default icon and banner
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UpdateSubrandditComponent;
