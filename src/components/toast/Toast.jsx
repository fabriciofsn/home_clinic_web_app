import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ tipo, mensagem }) => {
  const showToast = (type) => {
    toast[type](mensagem, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const tipoNotificacao = ['success', 'info', 'warning', 'error'].includes(tipo) ? tipo : 'success';

  showToast(tipoNotificacao);

  return <ToastContainer />;
};

export default Toast;
