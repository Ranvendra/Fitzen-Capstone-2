import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="loginform-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>

        <label className='label'>Full Name</label> <br/>
        <input
            className='login-input'
            type= "text"
            placeholder='Full Name'
            required
        /><br/>

        <label className='label'>E-mail</label><br/>
        <input
          type="email"
          className='login-input'
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>

        <label className='label'>Password</label><br/>
        <input
          type="password"
          className='login-input'
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button className = "loginSubmit" type="submit">Sign Up</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;