import React, { useEffect } from 'react';
import './Errors.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ImSad } from "react-icons/im";


const Error404 = () => {

  toast.error('Página não encontrada',{
    position: "top-left",
    autoClose: 2000,
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
          <ImSad size={90} color='#ffc107'/>
          <h1>Error 404 - Página Não Encontrada</h1>
          <p>A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
        </div>
    </div>
  );
};

export default Error404;