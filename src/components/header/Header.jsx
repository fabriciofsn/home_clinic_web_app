import React, { useEffect, useRef, useState } from 'react'
import { RiComputerFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GiNinjaMask } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import "./Header.css";
import { Link } from 'react-router-dom';
import Login from '../login/Login';

const Header = () => {  
  const token = localStorage.getItem('token');
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const refUl = useRef(null);
  const popupRef = useRef(null);

  function modal(){
    if(refUl.current)
    refUl.current.classList.toggle('active');
  }

  function logout() {
    const confirme = confirm('Deseja encerrar esta sessão?')
    if(confirme){
      localStorage.removeItem('token');
      window.location.href = '/'; 
    }
  }

   const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };
    

  return (
    <header>
        <h1>HealTech</h1>
      <div className="container">
          <ul ref={refUl} onClick={modal}>
            <li>
              <Link to="/"><RiComputerFill /> Administrativo</Link>
            </li>
            <li>
              <Link to="/pacientes"><FaUsers /> Pacientes</Link>
            </li>
            
            <li>
              <Link to="/medicos"><GiNinjaMask /> Médicos</Link>
            </li>

            <li>
              <Link to='/consultas'><MdAssignment />  Consultas</Link>
            </li>

            <li>
              {token ? <a onClick={logout} href="#"><RiLogoutBoxLine /> Logout</a> : <a onClick={handleOpenLoginPopup}href="#"><LuLogIn/> Login</a>}
            </li>
          </ul>
           
          <div className="bars"><FaBarsStaggered color='#d9d9d9' size={30} onClick={modal}/></div>
          {isLoginPopupOpen && (
        <div ref={popupRef}>
          <Login isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
        </div>
      )}
      </div>
    </header>
  )
}

export default Header