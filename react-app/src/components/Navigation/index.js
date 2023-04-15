import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>
      <Link className='navbar-logo' to='/'>
        <i className='fa-sharp fa-solid fa-p'></i>&nbsp;&nbsp;&nbsp;Prop Master
      </Link>
      <div className='navbar-links'>
        <NavLink exact to='/prophouses'>
          Prophouses
        </NavLink>
        <NavLink exact to='/props'>
          Props
        </NavLink>

        {sessionUser && !sessionUser.is_manager && (
          <NavLink exact to='/setlists'>
            Setlists
          </NavLink>
        )}

        {!sessionUser && (
          <>
            <Link to='/login'>Log in</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        )}

        {isLoaded && (
          <div className='profile-button'>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
