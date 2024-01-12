import React, { useEffect, useState } from 'react';
import "./Medicos.css";
import Heart from '../../assets/Heart.svg';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ExibirMedicos from './ExibirMedicos';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Medicos = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem('token');
  const [isLoading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() =>{
    async function buscarMedicos(){
      setLoading(true);
      try {
        const medicos = await fetch('https://apiclinica-brvy.onrender.com/medicos', {
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await medicos.json();
        setDados(data);
        toast.success('Médicos Carregados...',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } catch (error) {
        // navigator('/');
        toast.error('Você precisa estar autenticado!',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setTimeout(() =>{
          navigator('/');
        }, 2000)
      }finally{
        setLoading(false);
      }
    }
    buscarMedicos();
  }, [token]);

  const filteredData = dados && dados && dados.medicosDTO.filter((data) => {
    return data.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className='pacientes'>
      <ToastContainer />
      <div className="cadastrar">
        <h2>Médicos</h2>
        <Link to='/cadastrar/medico'><button className='cadastrar'>Cadastrar Novo Médico <FaLocationArrow /></button></Link>
      </div>
      <div class="search-container">
        <input type="search" class="search-box" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Procurar Por Médico..." />
    </div>
      <div className="wrapper">
        {isLoading && <div className='loading'><img src={Heart} /></div> }
        {filteredData && (
          <div style={{ display: 'flex' }}>
            <ExibirMedicos medico={filteredData} />
          </div>
        )}
        </div>
      </div>
  )
}

export default Medicos