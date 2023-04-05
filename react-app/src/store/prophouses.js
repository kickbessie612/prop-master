const SET_PROPHOUSES = 'prophouses/SET_PROPHOUSES';

export const setProphouses = prophouses => {
  return {
    type: SET_PROPHOUSES,
    prophouses
  };
};

// GET all prophouses
export const fetchProphouses = () => async dispatch => {
  const res = await fetch('/api/prophouses', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setProphouses(data));
  }
  return data;
};

// GET a prophouse by id
export const fetchProphouse = prophouseId => async dispatch => {
  const res = await fetch(`/api/prophouses/${prophouseId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setProphouses([data]));
  }
  return data;
};

// PUT edit a prophouse
export const updateProphouse = prophouse => async dispatch => {
  const res = await fetch(`/api/prophouses/${prophouse.id}`, {
    method: 'PUT',
    body: JSON.stringify(prophouse),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setProphouses([data]));
  }
  return data;
};

const prophousesReducer = (state = {}, action) => {
  let newState = { ...state };
  const prophousesObj = {};
  switch (action.type) {
    case SET_PROPHOUSES:
      action.prophouses.forEach(prophouse => {
        prophousesObj[prophouse.id] = prophouse;
      });
      newState = { ...newState, ...prophousesObj };
      return newState;
    default:
      return state;
  }
};

export default prophousesReducer;
