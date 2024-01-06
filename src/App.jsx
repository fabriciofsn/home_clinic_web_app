import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Pacientes from './components/pacientes/Pacientes';
import Medicos from './components/medicos/Medicos';
import Administrativo from './components/adm/Administrativo';
import AgendarConsulta from './components/agendarconsultas/AgendarConsulta';
import Cancelar from './components/cancelarConsulta/Cancelar';
import Consultas from './components/consultas/Consultas';
import CadastrarPaciente from './components/cadastrarpaciente/CadastrarPaciente';
import Login from './components/login/Login';
import AtualizarPaciente from './pages/atualizarpaciente/AtualizarPaciente';
import CadastrarMedico from './pages/cadastrarmedico/CadastrarMedico';
import AtualizarMedico from './pages/atualizarmedico/AtualizarMedico';
import ConsultasPendentes from './pages/consultaspendentes/ConsultasPendentes';
import DeletarConsulta from './pages/deletarconsulta/DeletarConsulta';
import AprovarConsulta from './components/aprovarconsulta/AprovarConsulta';
import Error404 from './pages/error/Error404';

const App = () => {
  return (
    <>
    
      <Router>
      <>
      <Header />
      <Routes>
        <Route path='/' element={<Administrativo />} />
        <Route path='/pacientes' element={<Pacientes />}/>
        <Route path='/medicos' element={<Medicos />}/> 
        <Route path='/agendar/consultas' element={<AgendarConsulta />} />
        <Route path='/cancelar' element={<Cancelar />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path='/cadastrar/paciente' element={<CadastrarPaciente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/atualizar/paciente/:id" element={<AtualizarPaciente />} />
        <Route path="/cadastrar/medico" element={<CadastrarMedico />} />
        <Route path="/atualizar/medico/:id" element={<AtualizarMedico />} />
        <Route path="/consultas/pendentes" element={<ConsultasPendentes />} />
        <Route path="/deletar/consulta/:id" element={<DeletarConsulta />} />
        <Route path="/aprovar/consulta/:id" element={<AprovarConsulta />} />
        <Route path="*" element={<Error404 />}/>
      </Routes>
        </>
      </Router>
    </>
  )
}

export default App