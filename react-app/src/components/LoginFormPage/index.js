import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className='signup-page-container'>
      <div className='signup-content'>
        <div className='logo'>
          <Link exact to='/'>
            <i className='fa-sharp fa-solid fa-p'></i>&nbsp;&nbsp;&nbsp;Prop
            Master
          </Link>
        </div>

        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-title'>Log in to Prop Master</div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type='text'
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className='signup-button-container'>
            <button type='submit'>Log In</button>
          </div>
        </form>
        <div>
          Need to create an account? &nbsp;<Link to='/signup'>Sign Up</Link>
        </div>
      </div>
      <div className='login-image-container'></div>
    </div>
  );
}

export default LoginFormPage;
