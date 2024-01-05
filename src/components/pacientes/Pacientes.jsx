import React, { useEffect, useState } from 'react';
import "./Pacientes.css";
import Exibir from '../exibir/Exibir';
import useFetch from '../useFetch/useFetch';
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Pacientes = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigator = useNavigate();

  useEffect(() =>{
    async function buscarPacientes(){
      setLoading(true);
      try {
        const pacientes = await fetch('http://localhost:3000/pacientes',{
        method: 'GET',
        headers:{
          'Authorization': `Bearer: ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await pacientes.json();
      setDados(data);

      if(pacientes.ok){
        toast.success('Pacientes Carregados.',{
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
      } catch (error) {
        toast.error('Você precisa estar autenticado!',{
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setTimeout(() =>{
        navigator('/');
      },1000)
      }finally{
        setLoading(false);
      }
    }
    buscarPacientes();
  }, [token]);
  

  const filteredData = dados && dados && dados.filter((data) => {
    return data.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='pacientes'>
      <ToastContainer position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
      <div className="cadastrar">
        <h2>Pacientes</h2>
        <Link to='/cadastrar/paciente'><button className='cadastrar'>Cadastrar Novo Paciente <FaLocationArrow /></button></Link>
      </div>
      <div class="search-container">
        <input type="search" class="search-box" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Procurar Por Paciente..." />
    </div>
      <div className="wrapper">
        {/* <div className="slide"> */}
          {isLoading && <div className='loading'><img src={Heart} /></div> }
          {/* <img src={prescription} alt="" /> */}
        {filteredData && (
          <div style={{ display: 'flex' }}>
            <Exibir paciente={filteredData} />
          </div>
        )}

        </div>
      </div>
    // </div>
  )
}

export default Pacientes