import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AtualizarMedico.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Heart from '../../assets/Heart.svg';

const AtualizarMedico = () => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  let {id} = useParams();
  
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
      await axios.put(`http://localhost:3000/medico/atualizar/${id}`,formulario);
      alert('Médico Atualizado! Você está sendo redirecionado à lista de Médicos');
      navigator('/medicos'); 
  }catch(e){
    alert(`Ocorreu um erro ao atualizar paciente ${e}`);
  }finally{
    setLoad(false);
  }
}
   useEffect(() =>{
    async function medicoRecuperado(){
      setLoad(true);
      try{
      let res = await axios.get(`http://localhost:3000/medico/${id}`);
       setFormulario({
          nome: res.data.nome,
          CRM: res.data.CRM,
          idade: res.data.idade,
          telefone: res.data.telefone,
          especialidade: res.data.especialidade,
          status: res.data.status,
          endereco:{
            estado: res.data.endereco.estado,
            cidade: res.data.endereco.cidade,
            bairro: res.data.endereco.bairro,
            rua: res.data.endereco.rua,
            cep: res.data.endereco.cep,
            numero: res.data.endereco.numero
        }
      })
    }catch(e){
      console.log(e);
    }finally{
      setLoad(false);
    }
  }
    medicoRecuperado();
  },[id])

  return (
    <div className='form'>
      <div className="titulo">
        <h1>Atualizar Médico</h1>
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
        <button type="submit">Atualizar</button>
      </div>
    </form>
      
    </div>
  )
}

export default AtualizarMedico