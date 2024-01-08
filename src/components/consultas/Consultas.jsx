import React, { useEffect, useState } from 'react';
import "./Consultas.css";
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import ExibirConsultas from './ExibirConsultas';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Consultas = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const [dados, setDados] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigator = useNavigate();
  useEffect(() =>{
    setLoading(true)
    async function buscarConsultas(){
      try{
        const consultas = await axios.get('http://localhost:3000/consultas', {
          method: "GET",
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        setDados(consultas);
        toast.success('Consultas Carregadas...',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      }catch(e){
        if(e.response.status === 401){
          toast.error('Você precisa estar autenticado',{
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setTimeout(() =>{
           navigator('/');
        },2000)
      }finally{
        setLoading(false);
      }
    }
    buscarConsultas();
  }, []);
 
  const filteredData = dados && dados.data.consultas && dados.data.consultas.filter((data) => {
    return data.paciente.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredConsultas = filteredData?.filter(consulta => consulta.status_da_consulta == 'AGENDADA');

  return (
    <div className='pacientes'>
      <ToastContainer />
      <div className="cadastrar">
        <h2>Consultas</h2>
        <div className='button-wrapper'>
        <Link to="/consultas/pendentes"><button className='pendentes'>Consultas Pendentes <MdWatchLater /></button></Link>
        <Link to='/agendar/consultas'><button className='cadastrar'>Agendar Nova Consulta <FaLocationArrow /></button></Link>
        </div>
      </div>
      <div class="search-container">
        <input type="search" class="search-box" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Procurar Por Consulta..." />
    </div>
      <div className="wrapper">
          {isLoading && <div className='loading'><img src={Heart} /></div> }
        {filteredConsultas && (
          <div style={{ display: 'flex' }}>
            <ExibirConsultas consultas={filteredConsultas} />
          </div>
        )}
        </div>
      </div>
  )
}

export default Consultas