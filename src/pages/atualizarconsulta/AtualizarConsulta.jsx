import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AtualizarConsulta.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Heart from '../../assets/Heart.svg';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AtualizarConsulta = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem('token');
  const [medicosFilter, setMedicosFilter] = useState(null);
  const [consulta, setConsulta] = useState(null);
  let {id} = useParams();
  
  const [formulario, setFormulario] = useState({
    paciente: '',
    medico: '',
    valor: 0,
    status_da_consulta: '',
    status_do_pagamento: '',
    metodo_do_pagamento: '',
    data: ''
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
      await axios.put(`http://localhost:3000/consulta/${id}`,formulario,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Consulta Atualizada',{
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
        // navigator('/consultas'); 
      },2000)
  }catch(e){
    if(e.status === 401){
      toast.error('Você Precisa Está Autenticado',{
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
    }else{
      alert(`Ocorreu um erro ao atualizar paciente ${e}`);
    }
  }finally{
    setLoad(false);
  }
}

  useEffect(() =>{
    async function carregarMedicos(){
      try {
        const medicos = await axios.get('http://localhost:3000/medicos',{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        setMedicosFilter(medicos);
      } catch (error) {
         toast.error('Não foi possível carregar médicos',{
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
    }

    carregarMedicos();
  },[])
  console.log(medicosFilter && medicosFilter.data.medicosDTO);
   useEffect(() =>{
    async function consultaRecuperada(){
      setLoad(true);
      try{
      let res = await axios.get(`http://localhost:3000/consulta/${id}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setConsulta(res.data.consulta);
    }catch(e){
      if(e.status === 401){
      toast.error('Ocorreu um erro ao atualizar esta consulta',{
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
      }, 2000)
    }else{
      toast.error('Ocorreu um erro ao carregar esta consulta',{
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
    }finally{
      setLoad(false);
    }
  }
    consultaRecuperada();
  },[id])
  
  useEffect(() =>{
    setFormulario({
      paciente:consulta && consulta.paciente.id,
      medico:consulta && consulta.medico.id,
      valor: consulta && consulta.valor,
      status_da_consulta: consulta && consulta.status_da_consulta,
      status_do_pagamento: consulta && consulta.status_do_pagamento,
      metodo_do_pagamento:consulta && consulta.metodo_do_pagamento,
      data: consulta && consulta.data.slice(0, 10)
    })
  }, [consulta])

  return (
    <div className='form'>
      <ToastContainer />
      <div className="titulo">
        <h1>Atualizar Consulta</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <div style={{display:'flex',justifyContent: 'center'}}><img style={{maxWidth: '200px'}} src={Heart} /></div>}
      <div className="secao">
        <div className="linha">
          <div className="campo">
            <label>Paciente:</label>
            <select disabled name="paciente" id="paciente" value={formulario.paciente} onChange={handleChange} required>
              {consulta &&  <option key={consulta.paciente.id} style={{textTransform: 'capitalize'}} value={consulta.paciente.id}>{consulta.paciente.nome}</option>}
            </select>
          </div>
          <div className="campo">
            <label>Médico:</label>
            <select name="medico" id="medico" value={formulario.medico} onChange={handleChange} required>
            {consulta && <option key={consulta.medico.id} style={{textTransform: 'capitalize'}} value={consulta.medico.id}>{consulta.medico.nome}</option>} 
            {/* {medicosFilter && medicosFilter.data.medicosDTO(medico => <option key={medico.id}></option>)} */}
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
            <select name="status_da_consulta" value={formulario.status_da_consulta} onChange={handleChange} id="status_da_consulta">
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
        <button type="submit">Atualizar</button>
      </div>
    </form>
      
    </div>
  )
}

export default AtualizarConsulta