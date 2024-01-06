import React, { useEffect, useState } from 'react';
import medicos from '../../assets/medicos.svg';
import "./Administrativo.css";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Administrativo = () => {
  const token = localStorage.getItem('token');
  const [pdf, setPDF] = useState(null);

  const downloadRelatorio = async () =>{
    const consultas = await axios.get('http://localhost:3000/consultas',{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    

    if(consultas.status == 200){

    const agendadas = consultas.data.consultas.filter(consulta => consulta.status_da_consulta == 'AGENDADA');
    const canceladas = consultas.data.consultas.filter(consulta => consulta.status_da_consulta == 'CANCELADA');
    
    const PDF = new jsPDF();
    let y = 50;
    const nomesAgendados = agendadas.map(consulta => consulta.paciente);
    const valorAgendados = agendadas.map(consulta => consulta.valor);
    const nomesCanceladas = canceladas.map(consulta => consulta.paciente.nome);
    PDF.text('Relatório de consultas', 85, 10);
    
    PDF.text('Pacientes Que Tiveram Consultas Agendadas Nesse Mês:', 10, 30);
    nomesAgendados.forEach(({nome,CPF}) => {
      PDF.text(`Paciente: ${nome}; CPF: ${CPF}`, 10, y);
      y += 20;
    })

    PDF.text('Faturamento bruto:', 10, y);
    let totalBruto = 0;
    valorAgendados.forEach(valor =>{
      totalBruto += valor;
    })
    y += 10;
    PDF.text(`R$ ${totalBruto}`, 10, y);



    setPDF(PDF);
    

    const download = () =>{
      if(pdf){
        pdf.save('doc.pdf');
        toast.success('Download Bem-Sucedido', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
        
      }
    }
    download();
  }
  
}

  return (
    <div className='administrativo'>
      <img src={medicos} alt="medicos" />
      <ToastContainer />
      <div className="button">
        <Link to="/agendar/consultas"><button className='consulta'>Agendar Uma Consulta <IoIosArrowForward /></button></Link>
        <Link to="/cancelar"><button className='cancelar'>Consultas Canceladas <MdDoubleArrow /></button></Link>
        <button className='download' onClick={downloadRelatorio}>Relatório de Consultas <FaDownload /></button>
      </div>
    </div>
  );
}

export default Administrativo;
