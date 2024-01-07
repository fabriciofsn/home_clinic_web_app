import React, { useEffect, useState } from 'react';
import ExibirConsultasPendentes from './ExibirConsultasPendentes';
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ConsultasPendentes = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem('token');
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() =>{
    setLoading(true)
    async function buscarConsultas(){
      try{
        const consultas = await fetch('http://localhost:3000/consultas',{
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await consultas.json();
        setDados(data);
        console.log(data)
        toast.success('Consulta Pendentes Carregadas',{
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
        toast.error('Você Precisa Estar Autenticado',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      })
      }finally{
        setLoading(false);
      }
    }
    buscarConsultas();
  }, [token]);
 
  const filteredData = dados && dados.consultas && dados.consultas.filter((data) => {
    return data.paciente.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredConsultas = filteredData?.filter(consulta => consulta.status_da_consulta == 'PENDENTE');

  return (
    <div className='pacientes'>
      <ToastContainer />
      <div className="cadastrar">
        <h2>Consultas</h2>
        <div className='button-wrapper'>
        <Link to='/agendar/consultas'><button className='cadastrar'>Agendar Nova Consulta <FaLocationArrow /></button></Link>
        </div>
      </div>
      <div class="search-container">
        <input type="search" class="search-box" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Procurar Por Consulta..." />
    </div>
      <div className="wrapper">
          {isLoading && <div className='loading'><img src={Heart} /></div>}
        {filteredData && (
          <div style={{ display: 'flex' }}>
            <ExibirConsultasPendentes consultas={filteredConsultas} />
          </div>
        )}
        </div>
      </div>
    // </div>
  )
}

export default ConsultasPendentes