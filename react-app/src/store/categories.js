const SET_CATEGORY = 'categories/SET_CATEGORY';

export const setCategories = categories => {
  return {
    type: SET_CATEGORY,
    categories
  };
};

// GET all categories
export const fetchCategories = () => async dispatch => {
  const res = await fetch('/api/categories', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setCategories(data));
  }
  return data;
};

const categoriesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_CATEGORY:
      const categoriesObj = {};

      action.categories.forEach(category => {
        categoriesObj[category.id] = category;
      });
      newState = { ...newState, ...categoriesObj };
      return newState;
    default:
      return state;
  }
};

export default categoriesReducer;
