import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        'Confirm Password field must be the same as the Password field'
      ]);
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
          <div className='signup-title'>Sign Up to Prop Master</div>
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
            type='text'
            value={username}
            placeholder='Username'
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <div className='signup-button-container'>
            <button>Sign Up</button>
          </div>
        </form>
        <div>
          Have an account? &nbsp;<Link to='/login'>Log In</Link>
        </div>
      </div>
      <div className='signup-image-container'></div>
    </div>
  );
}

export default SignupFormPage;
