// Action types:

const CREATE_POST = "post/create";
const LOAD_POSTS = "post/load";
const EDIT_POST = "post/edit";
const LOAD_POST_BY_SUB = "subranddit/load_by_sub";
const LOAD_POST_BY_POST = "post/read";
const DEL_POST = "post/delete";
const GET_USER = "post/writer";

// action types for voting:
const UPVOTE_POST = "post/upvote";
const DOWNVOTE_POST = "post/downvote";

// Action creators:

// const GetUserAction = (payload) => {
//     return {
//         type: GET_USER,
//         payload
//     }
// }

const writePostAction = (subrandditId) => {
  return {
    type: CREATE_POST,
    subrandditId,
  };
};

const loadPostsAction = (payload) => {
  return {
    type: LOAD_POSTS,
    payload,
  };
};

const readPostByPostAction = (payload) => {
  return {
    type: LOAD_POST_BY_POST,
    payload,
  };
};

const loadPostsBySubIdAction = (payload) => {
  return {
    type: LOAD_POST_BY_SUB,
    payload,
  };
};

const editPostAction = (payload) => {
  return {
    type: EDIT_POST,
    payload,
  };
};

const deletePostAction = (postId) => {
  return {
    type: DEL_POST,
    postId,
  };
};

const upvotePostAction = (payload) => {
  return {
    type: UPVOTE_POST,
    payload,
  };
};

const downvotePostAction = (payload) => {
  return {
    type: DOWNVOTE_POST,
    payload,
  };
};

// Thunks:

// export const WriteAPostThunk = (subrandditId) => async dispatch => {

//     const response = await fetch(`/api/subranddits/${subrandditId}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(subrandditId)
//     })
//     console.log("reply", response)
//     if (response.ok) {
//         const newpost = await response.json()
//         dispatch(writePostAction(newpost))
//         return newpost;
//     }
// }

//Creating a post:
export const WriteAPostThunk = (data) => async (dispatch) => {
  const { post_title, post_text, img_url, subranddit_id } = data;
  const formData = new FormData();
  formData.append("post_title", post_title);
  formData.append("post_text", post_text);
  formData.append("img_url", img_url);
  formData.append("subranddit_id", subranddit_id);

  const response = await fetch(`/api/subranddits/${data.subranddit_id}`, {
    method: "POST",
    body: formData,
  });
  const newPost = await response.json();
  dispatch(writePostAction(newPost));
  return newPost;
};

// Read all posts:
export const ReadPostsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/posts/all`);
  if (response.ok) {
    const allposts = await response.json();
    dispatch(loadPostsAction(allposts));
    return allposts;
  }
};

//Get user
// export const GetUserThunk = () => async dispatch => {
//     const response = await fetch(`/api/users`)
//     if (response.ok) {
//         const thisWriter = await response.json()
//         dispatch(GetUserAction(thisWriter))
//         return thisWriter;
//     }
// }

// Get all posts by its subranddit id:
export const ReadPostBySubrandditIdThunk =
  (subrandditId) => async (dispatch) => {
    const response = await fetch(`/api/subranddits/${subrandditId}/posts`);
    if (response.ok) {
      const allposts = await response.json();
      //console.log("check reducer", allposts)
      dispatch(loadPostsBySubIdAction(allposts));
      return allposts;
    }
  };

export const SeePostByItsPostIdThunk =
  (subrandditId, postId) => async (dispatch) => {
    const response = await fetch(
      `/api/subranddits/${subrandditId}/posts/${postId}`
    );
    if (response.ok) {
      const postpage = await response.json();
      dispatch(readPostByPostAction(postpage));
      return postpage;
    }
  };

// Edit your post hits:
export const EditPostThunk = (payloadData) => async (dispatch) => {
  const { id, post_title, post_text, image_url, author_id, subranddit_id } =
    payloadData;
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      post_title,
      post_text,
      image_url,
      author_id,
      subranddit_id,
    }),
  });
  if (response.ok) {
    const editted = await response.json();
    dispatch(editPostAction(editted));
    return editted;
  }
};

//Delete post:
export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePostAction(postId));
  }
};

// Voting thunks:
export const upvoteAPostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/upvote`, {
    method: "POST",
  });
  if (response.ok) {
    const upPost = await response.json();
    dispatch(upvotePostAction(upPost));
    return upPost;
  }
  return response;
};

export const downvoteAPostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/downvote`, {
    method: "POST",
  });
  if (response.ok) {
    const downPost = await response.json();
    dispatch(downvotePostAction(downPost));
    return downPost;
  }
  return response;
};

//Reducer:

let initialState = {};

const postReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CREATE_POST: {
      newState = { ...state };
      newState[action.subrandditId.id] = action.subrandditId;
      return newState;
    }
    case LOAD_POSTS: {
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case LOAD_POST_BY_SUB: {
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case GET_USER: {
      action.payload.forEach((user) => {
        newState[user.id] = user;
      });
      return { ...newState };
    }
    case LOAD_POST_BY_POST: {
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case EDIT_POST: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DEL_POST: {
      newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    case UPVOTE_POST: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DOWNVOTE_POST: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default postReducer;
