import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="loginform-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>

        <label className='label'>E-mail</label><br/>
        <input
          type="email"
          className='login-input'
          placeholder="E-mail"
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
        <button  className = "loginSubmit" type="submit">Login</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;