const SET_SCENES = 'scenes/SET_SCENES';
const REPLACE_SCENES = 'scenes/REPLACE_SCENES';
const REMOVE_SCENE = 'scenes/REMOVE_SCENE';

export const setScenes = scenes => {
  return {
    type: SET_SCENES,
    scenes
  };
};

export const replaceScenes = scenes => {
  return {
    type: REPLACE_SCENES,
    scenes
  };
};

export const removeScene = sceneId => {
  return {
    type: REMOVE_SCENE,
    sceneId
  };
};

// GET all scenes/
export const fetchScenes = search => async dispatch => {
  let url = '/api/scenes';
  if (search) {
    url += '?' + new URLSearchParams({ search });
  }
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    if (search) {
      dispatch(replaceScenes(data));
    } else {
      dispatch(setScenes(data));
    }
  }
  return data;
};

// GET a scene by id
export const fetchScene = sceneId => async dispatch => {
  const res = await fetch(`/api/scenes/${sceneId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setScenes([data]));
  }
  return data;
};

// POST create a scene
export const createScene = scene => async dispatch => {
  const res = await fetch('/api/scenes', {
    method: 'POST',
    body: JSON.stringify(scene),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setScenes([data]));
  }
  return data;
};

// PUT edit a scene
export const updateScene = scene => async dispatch => {
  const res = await fetch(`/api/scenes/${scene.id}`, {
    method: 'PUT',
    body: JSON.stringify(scene),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setScenes([data]));
  }
  return data;
};

//DELETE a scene
export const deleteScene = sceneId => async dispatch => {
  const res = await fetch(`/api/scenes/${sceneId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeScene(sceneId));
  }
  return res;
};

const scenesReducer = (state = {}, action) => {
  let newState = { ...state };
  const scenesObj = {};
  switch (action.type) {
    case SET_SCENES:
      action.scenes.forEach(scene => {
        scenesObj[scene.id] = scene;
      });
      newState = { ...newState, ...scenesObj };
      return newState;
    case REPLACE_SCENES:
      action.scenes.forEach(scene => {
        scenesObj[scene.id] = scene;
      });
      return scenesObj;
    case REMOVE_SCENE:
      delete newState[action.sceneId];
      return newState;
    default:
      return state;
  }
};

export default scenesReducer;
