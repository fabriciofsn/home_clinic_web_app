import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletarConsulta = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigator = useNavigate();

  useEffect(() => {
    const confirme = window.confirm('Deseja deletar esta consulta?');

    const deletarConsulta = async () => {
      if (confirme) {
        try {
          await axios.get(`https://apiclinica-brvy.onrender.com/consulta/deletar/${id}`, {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          alert('Consulta Deletada');
          navigator('/consultas/pendentes');
        } catch (e) {
          alert(`Ocorreu um erro ao deletar esta consulta ${e}`);
        }
      } else {
        navigator('/consultas/pendentes');
      }
    };

    deletarConsulta();
  }, [id, navigator]);
  return null;
};

export default DeletarConsulta;
