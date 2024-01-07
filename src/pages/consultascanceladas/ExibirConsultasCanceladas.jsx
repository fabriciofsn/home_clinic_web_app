  import React from 'react';
  import "./ExibirConsultasCanceladas.css";
  import { Link, useParams, useNavigate } from 'react-router-dom';
  import { MdDelete } from "react-icons/md";
  import { FcApproval } from "react-icons/fc";
  import DeletarConsulta from '../deletarconsulta/DeletarConsulta';
import AprovarConsulta from '../../components/aprovarconsulta/AprovarConsulta';

  const ExibirConsultasCanceladas = (props) => {
    function formatData(data){
      return data.slice(0,10);
    }
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
                <td>{formatData(consulta.data)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  export default ExibirConsultasCanceladas;
