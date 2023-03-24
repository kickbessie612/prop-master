import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout, login } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

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
      if (!ulRef.current.contains(e.target)) {
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
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className='fas fa-user-circle' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <button onClick={handleDresserLogin}>Demo Dresser</button>
            <button onClick={handleManagerLogin}>Demo Manager</button>
            <OpenModalButton
              buttonText='Log In'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText='Sign Up'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
