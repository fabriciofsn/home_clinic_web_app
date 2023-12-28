import React from 'react';
import "./ExibirMedicos.css";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Exibir = (props) => {

  return (
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CRM</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Especialidade</th>
            <th>Status</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Número</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {props.medico?.map(medico => (
            <tr key={medico.id}>
              <td>{medico.nome}</td>
              <td>{medico.CRM}</td>
              <td>{medico.idade}</td>
              <td>{medico.telefone}</td>
              <td>{medico.especialidade}</td>
              <td>{medico.status}</td>
              <td>{medico.endereco.estado}</td>
              <td>{medico.endereco.cidade}</td>
              <td>{medico.endereco.rua}</td>
              <td>{medico.endereco.bairro}</td>
              <td>{medico.endereco.numero}</td>
              <td style={{cursor: 'pointer'}}><Link to={`/atualizar/medico/${medico.id}`}>{<CiEdit size={30} color='#3498db'/>}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Exibir;
