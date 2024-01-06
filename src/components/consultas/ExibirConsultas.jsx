import React from 'react';
import "./ExibirConsulta.css";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';

const ExibirConsultas = (props) => {
  
  return (
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Valor</th>
            <th>Status Da Consulta</th>
            <th>Status Do Pagamento</th>
            <th>Método Do Pagamento</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {props.consultas?.map(consulta => (
            <tr key={consulta.id}>
              <td>{consulta.paciente.nome}</td>
              <td>{consulta.medico.nome}</td>
              <td>R${consulta.valor}</td>
              <td>{consulta.status_da_consulta}</td>
              <td>{consulta.status_do_pagamento}</td>
              <td>{consulta.metodo_do_pagamento}</td>
              <td>{consulta.data.slice(0,10)}</td>
              <td style={{cursor: 'pointer'}}><Link to={`/atualizar/consulta/${consulta.id}`}>{<CiEdit size={30} color='#3498db'/>}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExibirConsultas;
