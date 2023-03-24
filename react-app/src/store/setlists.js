const SET_SETLISTS = 'setlists/SET_SETLISTS';
const REMOVE_SETLIST = 'setlists/REMOVE_SETLIST';

export const setSetlists = setlists => {
  return {
    type: SET_SETLISTS,
    setlists
  };
};

export const removeSetlist = setlistId => {
  return {
    type: REMOVE_SETLIST,
    setlistId
  };
};

// GET all setlists
export const fetchSetlists = () => async dispatch => {
  const res = await fetch('/api/setlists', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setSetlists(data));
  }
  return data;
};

// GET a setlist by id
export const fetchSetlist = setlistId => async dispatch => {
  const res = await fetch(`/api/setlists/${setlistId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setSetlists([data]));
  }
  return data;
};

// POST create a setlist
export const createSetlist = setlist => async dispatch => {
  const res = await fetch('/api/setlists', {
    method: 'POST',
    body: JSON.stringify(setlist),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setSetlists([data]));
  }
  return data;
};

// PUT edit a setlist
export const updateSetlist = setlist => async dispatch => {
  const res = await fetch(`/api/setlists/${setlist.id}`, {
    method: 'PUT',
    body: JSON.stringify(setlist),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setSetlists([data]));
  }
  return data;
};

//DELETE a setlist
export const deleteSetlist = setlistId => async dispatch => {
  const res = await fetch(`/api/setlists/${setlistId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeSetlist(setlistId));
  }
  return res;
};

const setlistsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_SETLISTS:
      const setlistsObj = {};

      action.setlists.forEach(setlist => {
        setlistsObj[setlist.id] = setlist;
      });
      newState = { ...newState, ...setlistsObj };
      return newState;
    case REMOVE_SETLIST:
      delete newState[action.setlistId];
      return newState;
    default:
      return state;
  }
};

export default setlistsReducer;
