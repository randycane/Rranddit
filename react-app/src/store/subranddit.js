// Action type:

const CREATE_SUB = "subranddit/create";
const LOAD_SUBS = "subranddit/load";
const EDIT_SUB = "subranddit/edit";
const LOAD_SUB_BY_ID = "subrandditId/load";
const DEL_SUB = "subranddit/delete";
const LOAD_MY_SUBS = "subranddit/get_mine";
const SUBSCRIBE_TO_SUB = "subranddit/subscribe";

// Action creators:

const createNewSubAction = (payload) => {
  return {
    type: CREATE_SUB,
    payload,
  };
};

const loadSubsAction = (payload) => {
  return {
    type: LOAD_SUBS,
    payload,
  };
};

const getMyOwnSubsAction = (payload) => {
  return {
    type: LOAD_MY_SUBS,
    payload,
  };
};

const readOneSubAction = (payload) => {
  return {
    type: LOAD_SUB_BY_ID,
    payload,
  };
};

const editSubAction = (payload) => {
  return {
    type: EDIT_SUB,
    payload,
  };
};

const deleteSubAction = (payload) => {
  return {
    type: DEL_SUB,
    payload,
  };
};

const subscribeToSubAction = (subrandditId) => {
  return {
    type: SUBSCRIBE_TO_SUB,
    subrandditId,
  };
};

//Thunks:
// Get all subs:
export const getAllSubrandditsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/subranddits/all`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSubsAction(data));
    return data;
  }
  return response;
};

// create a subranddit:
export const createSubrandditThunk = (subranddit) => async (dispatch) => {
  const response = await fetch(`/api/subranddits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subranddit),
  });

  if (response.ok) {
    const newSubr = await response.json();
    console.log("a new sub", newSubr);
    dispatch(createNewSubAction(newSubr));
    return newSubr;
  }
  else if (response.status < 500) {
    // error handling
    return await response.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Get a single subranddit:
export const getSubFromIdThunk = (subrandditId) => async (dispatch) => {
  console.log("these should be loaded", subrandditId);
  const response = await fetch(`/api/subranddits/${subrandditId}`);
  if (response.ok) {
    const thisSub = await response.json();
    dispatch(readOneSubAction(thisSub));
  }
  return response;
};

// Get all my own subs:
export const getMyOwnSubsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/subranddits/subscriptions`, {});
  if (response.ok) {
    const subranddits = await response.json();
    dispatch(getMyOwnSubsAction(subranddits));
    return subranddits;
  }
  return response;
};

// editing a sub:
export const editSubThunk = (data) => async (dispatch) => {
  const response = await fetch(`/api/subranddits/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const updatedSubr = await response.json();
    dispatch(editSubAction(updatedSubr));
  } else if (response.status < 500) {
    // error handling
    return await response.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};

//delete a sub:
export const deleteSubThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/subranddits/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSubAction(id));
  }
};

// Subscribing to a subranddit:
export const subscribeToSubrandditThunk =
  (subrandditId) => async (dispatch) => {
    const res = await fetch(`/api/subranddits/${subrandditId}/subscribe`, {
      method: "POST",
    });
    if (res.ok) {
      dispatch(subscribeToSubAction(subrandditId));
      return subrandditId;
    }
    return res;
  };


// Subranddit Reducer:

let initialState = {};

const SubrandditReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CREATE_SUB: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case LOAD_SUBS: {
      action.payload.forEach((subranddit) => {
        newState[subranddit.id] = subranddit;
      });
      return newState;
    }

    case LOAD_SUB_BY_ID: {
      newState = {};
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_SUB: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DEL_SUB: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case SUBSCRIBE_TO_SUB: {
      newState = { ...state };
    }
    default:
      return state;
  }
};

export default SubrandditReducer;
