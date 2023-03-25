import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
      <NavLink exact to='/'>
        <i className='fa-sharp fa-solid fa-p'></i>&nbsp;&nbsp;&nbsp;Prop Master
      </NavLink>
      <NavLink exact to='/movies'>
        Movies
      </NavLink>
      <NavLink exact to='/prophouses'>
        Prophouses
      </NavLink>
      <NavLink exact to='/props'>
        Props
      </NavLink>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
  );
}

export default Navigation;
