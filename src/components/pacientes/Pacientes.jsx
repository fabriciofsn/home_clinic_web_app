import React, { useEffect, useState } from 'react';
import "./Pacientes.css";
import Exibir from '../exibir/Exibir';
import useFetch from '../useFetch/useFetch';
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Pacientes = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const {request, isLoading} = useFetch('http://localhost:3000/pacientes');

  useEffect(() =>{
    request().then((response) =>{
      setDados(response);
    })
  }, []);

  const filteredData = dados && dados.data && dados.data.filter((data) => {
    return data.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='pacientes'>
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