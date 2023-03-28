import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';

import PropIndex from './components/props/PropIndex';
import CreatePropForm from './components/props/CreatePropForm';
import PropShow from './components/props/PropShow';
import EditPropForm from './components/props/EditPropForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/props/:propId/edit'>
            <EditPropForm />
          </Route>
          <Route path='/props/new'>
            <CreatePropForm />
          </Route>
          <Route path='/props/:propId'>
            <PropShow />
          </Route>
          <Route path='/props'>
            <PropIndex />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
