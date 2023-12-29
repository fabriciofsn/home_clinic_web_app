import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DeletarConsulta = () => {

  let {id} = useParams();
  const navigator = useNavigate();
  useEffect(() =>{
    async function deletarConsultar(){
      try{ 
          const res = await axios.get(`http://localhost:3000/consulta/deletar/${id}`);
          alert('Consulta Deletada');
          navigator('/consultas/pendentes');
          console.log(res);
        }catch(e){
          alert(`Ocorreu um erro ao deletar esta consulta ${e}`)
        }
    }
    deletarConsultar();
  }, [id])
}

export default DeletarConsulta