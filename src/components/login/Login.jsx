import React, { useState } from 'react';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = ({isOpen,onClose}) => {
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
        localStorage.setItem('token', data);
        toast.success('Login Bem-Sucedido',{
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      onClose();
    }
  }catch (error) {
      alert('Dados Incorretos');
    }
  };

  return (
     <div className={`login-popup ${isOpen ? 'open' : ''}`}>
      <div className="login-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
      <ToastContainer />
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