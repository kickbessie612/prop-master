import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import propsReducer from './props';
import setlistsReducer from './setlists';
import categoriesReducer from './categories';
import prophousesReducer from './prophouses';

const rootReducer = combineReducers({
  session,
  props: propsReducer,
  setlists: setlistsReducer,
  categories: categoriesReducer,
  prophouses: prophousesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
