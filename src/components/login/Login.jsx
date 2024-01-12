import React, { useRef, useState } from 'react';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Heart from '../../assets/Heart.svg';

const Login = ({isOpen,onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const btnRef = useRef();

  const handleLogin = async () => {
    setLoading(true);
    if(btnRef.current){
      btnRef.current.style.opacity = '0.5';
    }
    try {
      const login = await fetch('https://apiclinica-brvy.onrender.com/login', {
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
    }else{
      toast.error('Dados Incorretos! Verifique Email e/ou Senha',{
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }catch (error) {
      toast.error(`Error: ${error}! \n Verifique sua conexão com a internet.`)
    }finally{
      setLoading(false);
      if(btnRef.current){
      btnRef.current.style.opacity = '1';
    }
    }
  };

  return (
     <div className={`login-popup ${isOpen ? 'open' : ''}`}>
      <div className="login-popup-content">
      {isLoading && <div style={{position: 'fixed',right: '.5%'}} className='loading'><img src={Heart} /></div> }
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
          <button ref={btnRef} type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login