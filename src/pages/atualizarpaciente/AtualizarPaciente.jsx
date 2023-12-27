import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AtualizarPaciente.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Heart from '../../assets/Heart.svg';

const CadastrarPaciente = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  let {id} = useParams();
  
  const [formulario, setFormulario] = useState({
    nome: '',
    CPF: '',
    idade: '',
    telefone: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      numero: '',
      cep: '',
      rua: ''
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      endereco: {
        ...formulario.endereco,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try{
      await axios.put(`http://localhost:3000/paciente/atualizar/${id}`,formulario);
      alert('Paciente Atualizado! Você está sendo redirecionado à lista de clientes');
      navigator('/pacientes'); 
  }catch(e){
    alert(`Ocorreu um erro ao atualizar paciente ${e}`);
  }finally{
    setLoad(false);
  }
}
   useEffect(() =>{
    async function recuperarPaciente(){
      setLoad(true);
      try{
      let res = await axios.get(`http://localhost:3000/paciente/${id}`);
       setFormulario({
          nome: res.data.pacienteRecuperado.nome,
          CPF: res.data.pacienteRecuperado.CPF,
          idade: res.data.pacienteRecuperado.idade,
          telefone: res.data.pacienteRecuperado.telefone,
          endereco:{
            estado: res.data.pacienteRecuperado.endereco.estado,
            cidade: res.data.pacienteRecuperado.endereco.cidade,
            bairro: res.data.pacienteRecuperado.endereco.bairro,
            rua: res.data.pacienteRecuperado.endereco.rua,
            cep: res.data.pacienteRecuperado.endereco.cep,
            numero: res.data.pacienteRecuperado.endereco.numero
        }
      })
    }catch(e){
      console.log(e);
    }finally{
      setLoad(false);
    }
  }
    recuperarPaciente();
  },[id])

  return (
    <div className='form'>
      <div className="titulo">
        <h1>Atualizar Paciente</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <div style={{display:'flex',justifyContent: 'center'}}><img style={{maxWidth: '200px'}} src={Heart} /></div>}
      <div className="secao">
        <h2>Informações Básicas</h2>
        <div className="linha">
          <div className="campo">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>CPF:</label>
            <input
              type="text"
              name="CPF"
              value={formulario.CPF}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              value={formulario.idade}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={formulario.telefone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="secao">
        <h2>Endereço</h2>
        <div className="linha">
          <div className="campo">
            <label>Estado:</label>
            <input
              type="text"
              name="estado"
              value={formulario.endereco.estado}
              onChange={handleEnderecoChange}
            />
          </div>
          <div className="campo">
            <label>Cidade:</label>
            <input
              type="text"
              name="cidade"
              value={formulario.endereco.cidade}
              onChange={handleEnderecoChange}
            />
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>Bairro:</label>
            <input
              type="text"
              name="bairro"
              value={formulario.endereco.bairro}
              onChange={handleEnderecoChange}
            />
          </div>
          <div className="campo">
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              value={formulario.endereco.numero}
              onChange={handleEnderecoChange}
            />
          </div>
        </div>
        <div className="linha">
          <div className="campo">
            <label>CEP:</label>
            <input
              type="text"
              name="cep"
              value={formulario.endereco.cep}
              onChange={handleEnderecoChange}
            />
          </div>
          <div className="campo">
            <label>Rua:</label>
            <input
              type="text"
              name="rua"
              value={formulario.endereco.rua}
              onChange={handleEnderecoChange}
            />
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

export default CadastrarPaciente