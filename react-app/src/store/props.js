const SET_PROPS = 'props/SET_PROPS';
const REMOVE_PROP = 'props/REMOVE_PROP';

export const setProps = props => {
  return {
    type: SET_PROPS,
    props
  };
};

export const removeProp = propId => {
  return {
    type: REMOVE_PROP,
    propId
  };
};

// GET all props
export const fetchProps = () => async dispatch => {
  const res = await fetch('/api/props', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setProps(data));
  }
  return data;
};

// GET a prop by id
export const fetchProp = propId => async dispatch => {
  const res = await fetch(`/api/props/${propId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setProps([data]));
  }
  return data;
};

// POST create a prop
export const createProp = prop => async dispatch => {
  const res = await fetch('/api/props', {
    method: 'POST',
    body: JSON.stringify(prop),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setProps([data]));
  }
  return data;
};

// PUT edit a prop
export const updateProp = prop => async dispatch => {
  const res = await fetch(`/api/props/${prop.id}`, {
    method: 'PUT',
    body: JSON.stringify(prop),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setProps([data]));
  }
  return data;
};

//DELETE a prop
export const deleteProp = propId => async dispatch => {
  const res = await fetch(`/api/props/${propId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeProp(propId));
  }
  return res;
};

const propsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_PROPS:
      const propsObj = {};

      action.props.forEach(prop => {
        propsObj[prop.id] = prop;
      });
      newState = { ...newState, ...propsObj };
      return newState;
    case REMOVE_PROP:
      delete newState[action.propId];
      return newState;
    default:
      return state;
  }
};

export default propsReducer;
