import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./CadastrarPaciente.css";
import axios from 'axios';
import Spinner from '../spinner/Spinner';

const CadastrarPaciente = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);

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
    setLoad(true);
    e.preventDefault(); 
    await axios.post('http://localhost:3000/cadastrar/paciente',formulario).then((res) =>{
      console.log(res);
    setLoad(false);  
      if(res.status == 200){
        alert('Paciente Cadastrado');
        navigator('/pacientes');
      }else{
        alert("Houve um erro ao tentar cadastrar novo paciente")
      }
    })
  };

  return (
    <div className='form'>
      <div className="titulo">
        <h1>Cadastrar Paciente</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <Spinner />}
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
        <button type="submit">Cadastrar</button>
      </div>
    </form>

    </div>
  )
}

export default CadastrarPaciente