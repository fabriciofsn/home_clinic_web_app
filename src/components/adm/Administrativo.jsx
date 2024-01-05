import React from 'react';
import medicos from '../../assets/medicos.svg';
import "./Administrativo.css";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";


const Administrativo = () => {
  return (
    <div className='administrativo'>
      <img src={medicos} alt="medicos" />

      <div className="button">
        <Link to="/agendar/consultas"><button className='consulta'>Agendar Uma Consulta <IoIosArrowForward /></button></Link>
        <Link to="/cancelar"><button className='cancelar'>Consultas Canceladas <MdDoubleArrow /></button></Link>
      </div>
    </div>
  );
}

export default Administrativo;
