import React, { useState } from 'react'
import "./Login.css";

const Login = ({isOpen,onClose}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    onClose();
  };

  return (
     <div className={`login-popup ${isOpen ? 'open' : ''}`}>
      <div className="login-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login