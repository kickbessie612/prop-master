const SET_MOVIES = 'movies/SET_MOVIES';
const REMOVE_MOVIE = 'movies/REMOVE_MOVIE';

export const setMovies = movies => {
  return {
    type: SET_MOVIES,
    movies
  };
};

export const removeMovie = movieId => {
  return {
    type: REMOVE_MOVIE,
    movieId
  };
};

// GET all movies
export const fetchMovies = () => async dispatch => {
  const res = await fetch('/api/movies', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies(data));
  }
  return data;
};

// GET a movie by id
export const fetchMovie = movieId => async dispatch => {
  const res = await fetch(`/api/movies/${movieId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies([data]));
  }
  return data;
};

// POST create a movie
export const createMovie = movie => async dispatch => {
  const res = await fetch('/api/movies', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies([data]));
  }
  return data;
};

// PUT edit a movie
export const updateMovie = movie => async dispatch => {
  const res = await fetch(`/api/movies/${movie.id}`, {
    method: 'PUT',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies([data]));
  }
  return data;
};

//DELETE a movie
export const deleteMovie = movieId => async dispatch => {
  const res = await fetch(`/api/movies/${movieId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeMovie(movieId));
  }
  return res;
};

// POST add scene to movie
export const movieAddProp = (movieId, sceneId) => async dispatch => {
  const res = await fetch(`/api/movies/${movieId}/scenes/${sceneId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies([data]));
  }
  return data;
};

// DELETE remove scene from movie
export const movieRemoveProp = (movieId, sceneId) => async dispatch => {
  const res = await fetch(`/api/movies/${movieId}/scenes/${sceneId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setMovies([data]));
  }
  return data;
};

const moviesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_MOVIES:
      const moviesObj = {};

      action.movies.forEach(movie => {
        moviesObj[movie.id] = movie;
      });
      newState = { ...newState, ...moviesObj };
      return newState;
    case REMOVE_MOVIE:
      delete newState[action.movieId];
      return newState;
    default:
      return state;
  }
};

export default moviesReducer;
