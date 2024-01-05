import React, { useState } from 'react'
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = ({isOpen,onClose}) => {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const login = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      });
      if(login.status == 200){
        const data = await login.json();
        const token = localStorage.setItem('token', data);
        alert('Login Bem-Sucedido');
      }
    } catch (error) {
      if(error.status == 401){
        console.log(error.message);
      }
      alert(`Ocorreu um erro ao tentar logar ${error.message}`);
    }
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
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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