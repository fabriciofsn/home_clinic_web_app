import React from 'react';
import "./Exibir.css";
import { CiEdit } from "react-icons/ci";
import {Link} from 'react-router-dom'

const Exibir = (props) => {
  return (
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Número</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {props.paciente?.map(paciente => (
            <tr key={paciente.id}>
              <td>{paciente.nome}</td>
              <td>{paciente.CPF}</td>
              <td>{paciente.idade}</td>
              <td>{paciente.telefone}</td>
              <td>{paciente.endereco.estado}</td>
              <td>{paciente.endereco.cidade}</td>
              <td>{paciente.endereco.rua}</td>
              <td>{paciente.endereco.bairro}</td>
              <td>{paciente.endereco.numero}</td>
              <td style={{cursor: 'pointer'}}><Link to={`/atualizar/paciente/${paciente.id}`}>{<CiEdit size={30} color='#3498db'/>}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Exibir;
