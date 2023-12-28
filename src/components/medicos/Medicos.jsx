import React, { useEffect, useState } from 'react';
import "./Medicos.css";
import useFetch from '../useFetch/useFetch';
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ExibirMedicos from './ExibirMedicos';

const Medicos = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const {request, isLoading} = useFetch('http://localhost:3000/medicos');

  useEffect(() =>{
    request().then((response) =>{
      setDados(response);
    })
  }, []);

  const filteredData = dados && dados.data && dados.data.medicosDTO.filter((data) => {
    return data.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='pacientes'>
      <div className="cadastrar">
        <h2>Médicos</h2>
        <Link to='/cadastrar/medico'><button className='cadastrar'>Cadastrar Novo Médico <FaLocationArrow /></button></Link>
      </div>
      <div class="search-container">
        <input type="search" class="search-box" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Procurar Por Médico..." />
    </div>
      <div className="wrapper">
        {/* <div className="slide"> */}
          {isLoading && <div className='loading'><img src={Heart} /></div> }
          {/* <img src={prescription} alt="" /> */}
        {filteredData && (
          <div style={{ display: 'flex' }}>
            <ExibirMedicos medico={filteredData} />
          </div>
        )}

        </div>
      </div>
    // </div>
  )
}

export default Medicos