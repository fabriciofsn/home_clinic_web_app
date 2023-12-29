import React from 'react';
import "./ExibirConsultasPendentes.css";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FcApproval } from "react-icons/fc";


const ExibirConsultasPendentes = (props) => {

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
            <th>Aprovar</th>
            <th>Deletar</th>
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
              <td>{consulta.data}</td>
              <td style={{cursor: 'pointer'}}>{<FcApproval size={30} color='#3498db'/>}</td>
              <td style={{cursor: 'pointer'}}>
                <Link to={`/deletar/consulta/${consulta.id}`}><MdDelete size={30} color='#830583'/></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExibirConsultasPendentes;
