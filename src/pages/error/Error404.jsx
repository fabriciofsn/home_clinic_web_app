import React, { useEffect, useState } from 'react';
import './Errors.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import sitting from '../../assets/sitting.png';

const Error404 = () => {

  toast.error(`Página não encontrada`,{
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
   
  return (
    <div className="container-error">
      <ToastContainer />
        <div className='wrapper-error'>
          <img className='sitting' src={sitting} />
          <h1>Error 404 - Página Não Encontrada</h1>
          <p>A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
        </div>
    </div>
  );
};

export default Error404;