import React, { useEffect, useState } from 'react';
import "./Consultas.css";
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import ExibirConsultas from './ExibirConsultas';
import axios from 'axios';

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

      }catch(e){
        if(e.response.status === 401){
          navigator('/');
          alert(`Você precisa estar autenticado ${e}`);
        }
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