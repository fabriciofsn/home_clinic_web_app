import React, { useEffect, useState } from 'react';
import ExibirConsultasPendentes from './ExibirConsultasPendentes';
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ConsultasPendentes = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() =>{
    setLoading(true)
    async function buscarConsultas(){
      try{
        const consultas = await axios.get('http://localhost:3000/consultas');
        setDados(consultas);
      }catch(e){
        alert(`Ocorreu um erro ${e}`);
      }finally{
        setLoading(false);
      }
    }
    buscarConsultas();
  }, []);
 
  const filteredData = dados && dados.data.consultas && dados.data.consultas.filter((data) => {
    return data.paciente.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredConsultas = filteredData?.filter(consulta => consulta.status_da_consulta !== 'AGENDADA');

  return (
    <div className='pacientes'>
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