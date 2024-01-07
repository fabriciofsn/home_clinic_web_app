  import React from 'react';
  import "./ExibirConsultasPendentes.css";
  import { Link, useParams, useNavigate } from 'react-router-dom';
  import { MdDelete } from "react-icons/md";
  import { FcApproval } from "react-icons/fc";
  import DeletarConsulta from '../deletarconsulta/DeletarConsulta';
  import AprovarConsulta from '../../components/aprovarconsulta/AprovarConsulta';
  import { ToastContainer, toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

  const ExibirConsultasPendentes = (props) => {
      function formatData(data){
      return data.slice(0,10);
    }
    const navigator = useNavigate();
    
    const handleDelete = () =>{
      <DeletarConsulta/>  
      navigator('/consultas/pendentes');
    }

    const handleAprovar = () =>{
      <AprovarConsulta />
      navigator('/consultas/pendentes');
    }
    
    return (
      <div className="wrapper">
        <ToastContainer />
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
                <td>{formatData(consulta.data)}</td>
                <td style={{cursor: 'pointer'}}>
                  <Link to={`/aprovar/consulta/${consulta.id}`}>
                    {<FcApproval onClick={handleAprovar} size={30} color='#3498db'/>}
                  </Link>
                </td>
                
                <td style={{cursor: 'pointer'}}>
                  <Link to={`/deletar/consulta/${consulta.id}`}><MdDelete onClick={handleDelete} size={30} color='#830583'/></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  export default ExibirConsultasPendentes;
