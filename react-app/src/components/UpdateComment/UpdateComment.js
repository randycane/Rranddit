import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReadCommentsByPostThunk, editCommentThunk } from "../../store/comment";
import "./UpdateComment.css";

const UpdateCommentComponent = ({ comment, onSuccess }) => {
    let { commentId } = useParams();
    commentId = Number(commentId);
    const dispatch = useDispatch();
    const [text, setText] = useState(comment.comment_text);
    const [errors, setErrors] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      let newComment = {
        id: comment.id,
        comment_text: text,
      };
      return dispatch(editCommentThunk(newComment)).then(async (response) => {
        if (!response.errors) {
          setSubmitSuccess(true);
          onSuccess();
        } else {
          setErrors(Object.values(response.errors));
        }
      });
    };

    return (
      <div className="editCommentFormContainer">
        <div className="innerEditCommentFormContainer">
          <form className="commentEditForm" onSubmit={handleSubmit}>
            <div>
              <span>Edit Comment:</span>
            </div>
            <ul>
              {errors.map((error, idx) => (
                <li className="errorDiv" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
            <div className="editCommentFormInputs">
              <textarea
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="editCommentButtonDiv">
              <button
                className="cancelEditCommentButton"
                onClick={() => {
                  onSuccess();
                }}
              >
                Cancel
              </button>
              <button className="edit-comm" type="submit">
                Edit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateCommentComponent;
