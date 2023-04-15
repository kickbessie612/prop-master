import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import PropIndex from './components/props/PropIndex';
import CreatePropForm from './components/props/CreatePropForm';
import EditPropForm from './components/props/EditPropForm';
import PropShow from './components/props/PropShow';
import SetlistIndex from './components/setlists/SetlistIndex';
import CreateSetlistForm from './components/setlists/CreateSetlistForm';
import SetlistShow from './components/setlists/SetlistShow';
import EditSetlistForm from './components/setlists/EditSetlistForm';
import ProphouseShow from './components/prophouses/ProphouseShow';
import EditProphouseForm from './components/prophouses/EditProphouseForm';
import ProphouseIndex from './components/prophouses/ProphouseIndex';

import Home from './components/Home';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/'>
            <div className='navbar-holder'>
              <Navigation isLoaded={isLoaded} />
            </div>
            <Route path='/props/:propId/edit'>
              <EditPropForm />
            </Route>
            <Route path='/props/new'>
              <CreatePropForm />
            </Route>
            <Route path='/props/:propId'>
              <PropShow />
            </Route>
            <Route exact path='/props'>
              <PropIndex />
            </Route>
            <Route path='/setlists/:setlistId/edit'>
              <EditSetlistForm />
            </Route>
            <Route path='/setlists/new'>
              <CreateSetlistForm />
            </Route>
            <Route path='/setlists/:setlistId'>
              <SetlistShow />
            </Route>
            <Route exact path='/setlists'>
              <SetlistIndex />
            </Route>
            <Route path='/prophouses/:prophouseId/edit'>
              <EditProphouseForm />
            </Route>
            <Route exact path='/prophouses/:prophouseId'>
              <ProphouseShow />
            </Route>
            <Route exact path='/prophouses'>
              <ProphouseIndex />
            </Route>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
