// Action type:

const CREATE_SUB = "subranddit/create"
const LOAD_SUBS = "subranddit/load"
const EDIT_SUB = "subranddit/edit"
const LOAD_SUB_BY_ID = "subrandditId/load"
const DEL_SUB = "subranddit/delete"

// Action creators:

const createNewSubAction = (payload) => {
    return {
        type: CREATE_SUB,
        payload
    }
}

const loadSubsAction = (payload) => {
    return {
        type: LOAD_SUBS,
        payload
    }
}

const readOneSubAction = (payload) => {
    return {
        type: LOAD_SUB_BY_ID,
        payload
    }
}

const editSubAction = (payload) => {
    return {
        type: EDIT_SUB,
        payload
    }
}

const deleteSubAction = (payload) => {
    return {
        type: DEL_SUB,
        payload
    }
}


//Thunks:

export const getAllSubrandditsThunk = () => async dispatch => {
    const response = await fetch(`/api/subranddits/`, {
        method: "GET"
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSubsAction(data))
        return data;
    }
    // return response;
}

export const createSubrandditThunk = (subranddit) => async dispatch => {
    const response = await fetch(`/api/subranddits/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subranddit)
    })

    if (response.ok) {
        const newSubr = await response.json()
        console.log("a new sub", newSubr)
      dispatch(createNewSubAction(newSubr))
      return newSubr
    }
    // return response.json()
}

export const getSubFromIdThunk = (subrandditId) => async dispatch => {
    console.log("these should be loaded", subrandditId)
    const response = await fetch(`/api/subranddits/${subrandditId}`)
    if (response.ok) {
        const thisSub = await response.json();
        dispatch(readOneSubAction(thisSub));
    }
    return response
}


export const editSubThunk = (payload, subrandditId) => async dispatch => {
    const response = await fetch(`/api/subranddits/${subrandditId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const updatedSubr = await response.json();
        dispatch(editSubAction(updatedSubr))
    }
    return response
}

export const deleteSubThunk = (id) => async dispatch => {
    const response = await fetch(`/api/subranddits/${id}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSubAction(id))
    }
}

// Subranddit Reducer:

let initialState = {};

const SubrandditReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case CREATE_SUB: {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState
        }
        case LOAD_SUBS: {
            action.payload.forEach((subranddit) => {
                newState[subranddit.id] = subranddit
            })
            return newState;
        }

        case LOAD_SUB_BY_ID: {
            newState = {};
            newState[action.payload.id] = action.payload
            return newState;
        }
        case EDIT_SUB: {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState
        }
        case DEL_SUB: {
            newState = { ...state };
            delete newState[action.payload];
            return newState
        }
        default:
            return state;
    }
}

export default SubrandditReducer;
