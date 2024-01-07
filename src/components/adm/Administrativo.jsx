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
    const nomesCanceladas = canceladas.map(consulta => consulta.paciente);
    const valoresCancelados = canceladas.map(consulta => consulta.valor);
 
    PDF.text('Relatório de consultas', 85, 10);
    
    PDF.text('Pacientes Que Tiveram Consultas Nesse Mês:', 10, 30);
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

    y += 10;

    PDF.text('Número de consultas Nesse Último Mês:', 10, y);
    let totalConsulta = 0;
    nomesAgendados.forEach(_ => totalConsulta += 1);
    y += 10;

    PDF.text(`Nº Consultas: ${totalConsulta}`, 10, y);

    y += 20;

    PDF.text('Consultas Canceladas:', 10, y);
    y += 10;
    nomesCanceladas.forEach(({nome,CPF}) =>{
      PDF.text(`Nome: ${nome}; CPF: ${CPF}`, 10, y);
      y += 10;
    })

    y += 10;
    PDF.text('Valores Devolvidos:', 10, y);
    y += 10;

    let valorDevolvido = 0;
    valoresCancelados.forEach(valor =>{
      valorDevolvido += valor;
    })
    
    y += 10;
    PDF.text(`Total: R$${valorDevolvido}`, 10, y);
    setPDF(PDF);
    y += 10;
    PDF.text('Número de Consultas Canceladas', 10, y);

    y += 10;

    let nCanceladas = 0;
    canceladas.forEach(_ => {
      nCanceladas += 1;
    })

    PDF.text(`Nº ${nCanceladas}`,10,y);

    const download = () =>{
      if(pdf){
        pdf.save('relatorio_de_consultas.pdf');
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
        <Link to="/consultas/canceladas"><button className='cancelar'>Consultas Canceladas <MdDoubleArrow /></button></Link>
        <button className='download' onClick={downloadRelatorio}>Relatório de Consultas <FaDownload /></button>
      </div>
    </div>
  );
}

export default Administrativo;
