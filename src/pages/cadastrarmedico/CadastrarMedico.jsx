import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./CadastrarMedico.css";
import axios from 'axios';
import Heart from '../../assets/Heart.svg';

const CadastrarMedico= () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: '',
    CRM: '',
    idade: '',
    telefone: '',
    especialidade: '',
    status: 'ATIVO',
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
      await axios.post('http://localhost:3000/cadastrar/medico',formulario);
      alert('Médico Cadastrado! Você será redirecionado à lista de Médicos.')
      navigator('/medicos');
    }catch(e){
      alert(`Ocorreu um erro ao cadastrar médico ${e}`);
    }finally{
      setLoad(false);
    }
  };

  return (
    <div className='form'>
      <div className="titulo">
        <h1>Cadastrar Médico</h1>
      </div>
       <form onSubmit={handleSubmit} className="formulario-lindo">
        {load && <div style={{display: 'flex',justifyContent: 'center'}}><img style={{maxWidth: '200px'}} src={Heart} /></div>}
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
            <label>CRM:</label>
            <input
              type="text"
              name="CRM"
              value={formulario.CRM}
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
        <div className="linha">
          <div className="campo">
            <label>Especialidade:</label>
            <input type="text" name='especialidade' value={formulario.especialidade}
            onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>STATUS</label>
            <select name="status" id="status" value={formulario.status} onChange={handleChange}>
              <option value="ATIVO">ATIVO</option>
              <option value="INATIVO">INATIVO</option>
              <option value="FERIAS">FÉRIAS</option>
              <option value="LICENCA">LICENÇA</option>
            </select>
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

export default CadastrarMedico