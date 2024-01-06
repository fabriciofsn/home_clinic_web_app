import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AprovarConsulta = () => {
  let { id } = useParams();
  const token = localStorage.getItem('token');
  const navigator = useNavigate();

    const [formulario, setFormulario] = useState({
    id: '',
    paciente: '',
    medico: '',
    data: '',
    valor: '',
    status_do_pagamento: 'CONFIRMADO',
    status_da_consulta: 'CANCELADA',
    metodo_do_pagamento: 'CARTAO_DE_CREDITO',
  });
  
  useEffect(() =>{
    const confirme = confirm('Deseja aprovar esta consulta?');

    const aprovarConsulta = async () =>{
      if(confirme){
      
      try{
        const consulta = await axios.get(`http://localhost:3000/consulta/${id}`,{
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        }).then((consulta) =>{
          console.log(consulta)
          setFormulario({
          id: consulta.data.consulta.id,
          paciente: consulta.data.consulta.paciente.id,
          medico: consulta.data.consulta.medico.id,
          data: consulta.data.consulta.data,
          valor: consulta.data.consulta.valor,
          status_do_pagamento: consulta.data.consulta.status_do_pagamento,
          status_da_consulta: "AGENDADA",
          metodo_do_pagamento: consulta.data.consulta.metodo_do_pagamento
        })
        })
      }catch(e){
        alert(`Ocorreu um erro ao aprovar esta consulta ${e}`);
      } 
    }else{
      navigator('/consultas/pendentes');
    }
  }
  aprovarConsulta();
  },[id])

  useEffect(() => {

    if (formulario.id) {
      const updateConsulta = async () => {
        try {
          const update = await axios.put(`http://localhost:3000/consulta/${id}`, formulario,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(update);
        alert('Consulta Aprovada!');
        navigator('/consultas/pendentes');
        } catch (error) {
          if(error.status === 401){
            alert('Você precisa estar autenticado');
          }else{
            alert(`Error ${error.message}`);
          }
        }
      };
      updateConsulta();
    }
  }, [formulario.paciente]);

  return null;
}

export default AprovarConsulta