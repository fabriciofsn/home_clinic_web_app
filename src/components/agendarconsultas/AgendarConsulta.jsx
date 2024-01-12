import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AgendarConsultas.css";
import Heart from '../../assets/Heart.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AgendarConsulta = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  const [pacientes, setPacientes] = useState(null);
  const [medicos, setMedicos] = useState(null);
  const token = localStorage.getItem('token');

  const [formulario, setFormulario] = useState({
    paciente: '',
    medico: '',
    data: '',
    valor: '',
    status_do_pagamento: 'CONFIRMADO',
    status_da_consulta: 'PENDENTE',
    metodo_do_pagamento: 'CARTAO_DE_CREDITO',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try{
        const salvar = await axios.post('https://apiclinica-brvy.onrender.com/agendar/consulta',formulario,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },    
      });
   
      if (salvar.status === 200) {
        toast.success('Consulta Enviada Para Revisão',{
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
          navigator('/consultas/pendentes');
        },1500)
      }else {
        toast.error('Você precisa estar autenticado',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        const errorData = salvar;
        throw new Error(`Erro na solicitação: ${JSON.stringify(errorData)}`);
      }
  }catch (error) {
    if (error.response.status === 401) {
      alert(`Você precisa estar autenticado ${error}`);
      navigator('/');
    } else {
      console.error(error.message);
    }
  } finally {
    setLoad(false);
  }
}
   useEffect(() =>{
    async function buscarMedicos(){
      setLoad(true);
      try{
      let res = await fetch(`https://apiclinica-brvy.onrender.com/medicos`,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setMedicos(data);
    }catch(e){
      if(e.response.status == 401){
        toast.error(`Você precisa estar autenticado`,{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() =>{
          navigator('/');
        },2000)
      }
    }finally{
      setLoad(false);
    }
  }
    buscarMedicos();
  },[token])

   useEffect(() =>{
    async function buscarPacientes(){
      setLoad(true);
      try{
      let res = await fetch(`https://apiclinica-brvy.onrender.com/pacientes`,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if(res){
        const data = await res.json();
        setPacientes(data);
      }
    }catch(e){
      toast.error(`Você precisa esta autenticado`,{
         position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() =>{
        navigator('/');
      },2000)
    }finally{
      setLoad(false);
    }
  }
    buscarPacientes();
  },[token])

  const medicosFilter = medicos && medicos.medicosDTO.filter(medico => medico.status == 'ATIVO');

  console.log(formulario);
  return (
    <div className='form'>
      <ToastContainer />
      <div className="titulo">
        <h1>Agendar Consulta</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <div style={{display:'flex',justifyContent: 'center'}}><img style={{maxWidth: '200px'}} src={Heart} /></div>}
      <div className="secao">
        <div className="linha">
          <div className="campo">
            <label>Paciente:</label>
            <select name="paciente" id="paciente" value={formulario.paciente} onChange={handleChange} required>
              {pacientes && pacientes.map(paciente =>{
                return <option key={paciente.id} style={{textTransform: 'capitalize'}} value={paciente.id}>{paciente.nome}</option>
            })}
            </select>
          </div>
          <div className="campo">
            <label>Médico:</label>
            <select name="medico" id="medico" value={formulario.medico} onChange={handleChange} required>
            {medicosFilter && medicosFilter.map(medico =>{
              return(
                  <option key={medico.id} style={{textTransform: 'capitalize'}} value={medico.id}>{medico.nome}</option>
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
              required
            />
          </div>
          <div className="campo">
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={formulario.data}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Status Da Consulta:</label>
            <select disabled name="status_da_consulta" value={formulario.status_da_consulta} onChange={handleChange} id="status_da_consulta">
              <option defaultChecked="PENDENTE" value="PENDENTE">PENDENTE</option>
              <option value="AGENDADA">AGENDADA</option>
              <option value="CANCELADA">CANCELADA</option>
            </select>
          </div>
          <div className="campo">
            <label>Status Do Pagamento:</label>
            <select name="status_do_pagamento" value={formulario.status_do_pagamento} onChange={handleChange} id="status_do_pagamento">
              <option value="CONFIRMADO">CONFIRMADO</option>
              <option value="PENDENTE">PENDENTE</option>
            </select>
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Método De Pagamento:</label>
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