import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AgendarConsultas.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Heart from '../../assets/Heart.svg';

const AgendarConsulta = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  const [pacientes, setPacientes] = useState(null);
  const [medicos, setMedicos] = useState(null);

  const [formulario, setFormulario] = useState({
    paciente: '',
    medico: '',
    data: '',
    valor: '',
    status_do_pagamento: 'CONFIRMADO',
    status_da_consulta: 'AGENDADA',
    metodo_do_pagamento: 'CARTAO_DE_CREDITO',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };
  console.log(formulario)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try{
      await axios.post(`http://localhost:3000/agendar/consulta`,formulario);
      alert('Consulta Agendada!');
      navigator('/'); 
  }catch(e){
    alert(`Ocorreu um erro ao agendar esta consulta ${e}`);
  }finally{
    setLoad(false);
  }
}
   useEffect(() =>{
    async function buscarMedicos(){
      setLoad(true);
      try{
      let res = await axios.get(`http://localhost:3000/medicos`);
      setMedicos(res);
    }catch(e){
      console.log(e);
    }finally{
      setLoad(false);
    }
  }
    buscarMedicos();
  },[])

   useEffect(() =>{
    async function buscarPacientes(){
      setLoad(true);
      try{
      let res = await axios.get(`http://localhost:3000/pacientes`);
      setPacientes(res);
    }catch(e){
      console.log(e);
    }finally{
      setLoad(false);
    }
  }
    buscarPacientes();
  },[])

  const medicosFilter = medicos && medicos.data.medicosDTO.filter(medico => medico.status == 'ATIVO');

  return (
    <div className='form'>
      <div className="titulo">
        <h1>Agendar Consulta</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <div style={{display:'flex',justifyContent: 'center'}}><img style={{maxWidth: '200px'}} src={Heart} /></div>}
      <div className="secao">
        <h2>Informações Básicas</h2>
        <div className="linha">
          <div className="campo">
            <label>Paciente:</label>
            <select name="paciente" id="paciente" value={formulario.paciente} onChange={handleChange}>
              {pacientes && pacientes.data.map(paciente =>{
                return <option value={paciente.id}>{paciente.nome}</option>
            })}
            </select>
          </div>
          <div className="campo">
            <label>Médico:</label>
            <select name="medico" id="medico" value={formulario.medico} onChange={handleChange}>
            {medicosFilter && medicosFilter.map(medico =>{
              return(
                  <option value={medico.id}>{medico.nome}</option>
                  )
                })}
            </select>
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              value={formulario.valor}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={formulario.data}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Status Da Consulta</label>
            <select name="status_da_consulta" value={formulario.status_da_consulta} onChange={handleChange} id="status_da_consulta">
              <option value="AGENDADA">AGENDADA</option>
              <option value="PENDENTE">PENDENTE</option>
            </select>
          </div>
          <div className="campo">
            <label>Status Do Pagamento</label>
            <select name="status_do_pagamento" value={formulario.status_do_pagamento} onChange={handleChange} id="status_do_pagamento">
              <option value="CONFIRMADO">CONFIRMADO</option>
              <option value="PENDENTE">PENDENTE</option>
            </select>
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Método De Pagamento</label>
            <select name="metodo_do_pagamento" value={formulario.metodo_do_pagamento} onChange={handleChange} id="metodo_do_pagamento">
              <option value="CARTAO_DE_CREDITO">CARTÃO DE CRÉDITO</option>
              <option value="CARTAO_DE_DEBITO">CARTÃO DE DÉBITO</option>
              <option value="PIX">PIX</option>
              <option value="EM_DINHEIRO">EM ESPÉCIE</option>
            </select>
          </div>
        </div>
      </div>
     
      <div className="linha">
        <button type="submit">Agendar</button>
      </div>
    </form>
      
    </div>
  )
}

export default AgendarConsulta