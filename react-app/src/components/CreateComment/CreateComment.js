import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createCommentThunk } from "../../store/comment";
import "./CreateComment.css";

function WriteACommentComponent({ post, onSuccess= null }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sessionUser = useSelector((state) => state?.session?.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newComment = {
      comment_text: text,
      post_id: post.id,
    };

    return dispatch(createCommentThunk(newComment))
      .then(async (response) => {
      if (!response.errors) {
        setSubmitSuccess(true);
        setText("");
        onSuccess && onSuccess();
      } else {
        setErrors(Object.values(response.errors));
      }
    });
  };

  return (
    <div className="commentFormContainer">
      <form className="innerCommentFormContainer" onSubmit={handleSubmit}>
        <div className="commentForm">
          <ul>
            {errors.map((error, idx) => (
              <li className="errorDiv" key={idx}>
                {error}
              </li>
            ))}
          </ul>

          <span className="comment-as">
            Comment as u/
            <a href={`/user/${sessionUser.id}`}>{sessionUser.username}</a>
          </span>
          <label>
            <textarea
              className="commentTextBox"
              type="text"
              placeholder="What are your thoughts?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
        <div className="createCommentButtonDiv">
          <button className="createCommentButton" type="submit">
            Create Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default WriteACommentComponent;
