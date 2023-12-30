import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletarConsulta = () => {
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const confirme = window.confirm('Deseja deletar esta consulta?');

    const deletarConsulta = async () => {
      if (confirme) {
        try {
          await axios.get(`http://localhost:3000/consulta/deletar/${id}`);
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
