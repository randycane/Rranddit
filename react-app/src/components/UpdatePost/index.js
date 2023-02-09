import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { EditPostThunk, SeePostByItsPostIdThunk } from "../../store/post";

import "./UpdatePost.css";

const UpdatePostComponent = () => {
  let { postId } = useParams();
  postId = Number(postId);

  const dispatch = useDispatch();
  let thispost = useSelector((state) => Object.values(state?.posts));
  thispost = thispost[0] ? thispost[0] : thispost;
  const sessionUser = useSelector((state) => state.session.user);
  const [postLoaded, setPostLoaded] = useState(false);
  const [title, setTitle] = useState(thispost.post_title);
  const [imageUrl, setImageUrl] = useState(thispost.img_url);
  const [text, setText] = useState(thispost.post_text);
  const [subranddit, setSubranddit] = useState(1);

  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (thispost.title) {
      setTitle(thispost.post_title);
      setImageUrl(thispost.img_url);
      setText(thispost.post_text);
      setSubranddit(thispost.subranddit_id);
    }
  }, [thispost]);

  useEffect(() => {
    dispatch(SeePostByItsPostIdThunk(postId)).then(() => {
      setPostLoaded(true);
    });
  }, [dispatch, postId]);

  if (submitSuccess) {
    return <Redirect to={`/user/${sessionUser.id}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newPostData = {
      id: postId,
      post_title: title,
      img_url: imageUrl,
      post_text: text,
      subranddit_id: subranddit,
    };

    return dispatch(EditPostThunk(newPostData)).then(async (response) => {
      if (!response.errors) {
        setSubmitSuccess(true);
      }
      else {
        setErrors(Object.values(response.errors));
      }
    });
  };

  if (postLoaded) {
    return (
      <div className="editPostFormPageContainer">
        <div className="innerEditPostFormPageContainer">
          <div className="editPostFormContainer">
            <div className="editPostFormTitle">
              <span className="editFormTitle">Edit Post:</span>
            </div>
            <form className="postEditForm" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li className="errorDiv" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
              <div className="innerPostEditContainer">
                <label>
                  <span className="editFormTitleSpan">Title:</span>
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span className="edit-text-span">Text:</span>
                  <input
                    className="createTextBox"
                    type="text"
                    placeholder="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </label>
                <label className="form">
                  <span> Post image (optional): </span>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </label>

                <div className="editting-posts">
                  <button className="post-the-edit" type="submit">Edit Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UpdatePostComponent;
