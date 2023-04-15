import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout, login } from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleDresserLogin = e => {
    dispatch(login('marnie@aa.io', 'password'));
  };

  const handleManagerLogin = e => {
    dispatch(login('demo@aa.io', 'password'));
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <>
      <i onClick={openMenu} className='fas fa-user-circle profile-button' />

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={handleDresserLogin}>Demo Dresser</button>
            <button onClick={handleManagerLogin}>Demo Manager</button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
