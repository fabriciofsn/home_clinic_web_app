import React from 'react'
import { PiUserFill } from "react-icons/pi";
import "./Exibir.css";

const Exibir = (props) => {
  return (
    <div className="wrapper">
    <div className='exibir'>
      <div className="icon">
        <PiUserFill size={50}/>
      </div>
      <div className="title">
        <h4>Paciente</h4>
      </div>
      <div className="dados">
        <span>Nome: {props.nome}</span>
        <span>CPF: {props.CPF}</span>
      </div>
      <div className="dados">
        <span>Idade: {props.idade}</span>
        <span>Telefone: {props.telefone}</span>
      </div>
      <div className="address">
        <h4>Endereço</h4>
      </div>
      <div className="dados">
        <span>Estado: {props.estado}</span>
        <span>Cidade: {props.cidade}</span>
      </div>
      <div className="dados">
        <span>Cep: {props.cep}</span>
        <span>Bairro: {props.bairro}</span>
      </div>
      <div className="dados">
        <span>Rua: {props.rua}</span>
        <span>Número: {props.numero}</span>
      </div>
    </div>
    </div>
  )
}

export default Exibir