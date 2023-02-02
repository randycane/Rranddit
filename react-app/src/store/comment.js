const WRITE_COMMENT = "comment/createComment";
const GET_COMMENTS_BY_POST = "comment/getComments";
const UPDATE_COMMENT = "comment/updateComment";
const DELETE_COMMENT = "comment/deleteComment";

//Action creators:

const writeComment = (payload) => {
  return {
    type: WRITE_COMMENT,
    payload,
  };
};

const getCommentsByPost = (payload) => {
  return {
    type: GET_COMMENTS_BY_POST,
    payload,
  };
};

const updateComment = (payload) => {
  return {
    type: UPDATE_COMMENT,
    payload,
  };
};

const deleteComment = (payload) => {
  return {
    type: DELETE_COMMENT,
    payload,
  };
};

//Thunks:
export const ReadCommentsByPostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (response.ok) {
    const thecomments = await response.json();
    dispatch(getCommentsByPost(thecomments));
    return thecomments;
  }
};

export const createCommentThunk = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/comments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const newComm = await response.json();
    dispatch(writeComment(newComm));
    return newComm;
  } else if (response.status < 500) {
    return await response.json();
  } else {
    return ["An error occurred. Please try again"];
  }
};

export const editCommentThunk = (payload, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const updatedComm = await response.json();
    dispatch(updateComment(updatedComm));
    return updatedComm;
  } else if (response.status < 500) {
    return await response.json();
  } else {
    return ["An error occurred. Please try again"];
  }
};

export const deleteCommentThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(id));
  }
};

// Reducer:
let initialState = {};

const CommentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case WRITE_COMMENT: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case GET_COMMENTS_BY_POST: {
      newState = {};
      newState[action.payload.comments] = action.payload;
      return newState;
    }
    case UPDATE_COMMENT: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default CommentReducer;
