import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 
import { toast } from 'react-toastify';


const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken();

export const postNewProcedureVersion = async (procedureId, file) => {
  try {
      const formData = new FormData();
      formData.append('id', procedureId);
      formData.append('file', file);
      
      const response = await axios.post(`${api}/procedures/createNewVersion`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      });
      toast.success('Nouvelle version de la procédure créée avec succès');
      return response.data;
      
  } catch (error) {
      toast.error(`Erreur lors de la création de la nouvelle version: ${error.response ? error.response.data : error.message}`);
      console.error('Error posting data:', error.response ? error.response.data : error.message);
      throw error;
  }
};
export const downloadFile = (procedureId) => {
    axios({
        url: `${api}/procedures/download/${procedureId}`, 
        responseType: 'blob', 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const disposition = response.headers['content-disposition'];
        console.log(disposition);
        const filename = disposition
            ? disposition.split('filename=')[1].replace(/"/g, '')
            : 'default-filename.pdf'; 
        link.setAttribute('download', filename); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.open(url, '_blank');
    })
    .catch(error => {
        console.error('Erreur lors du téléchargement du fichier :', error.response ? error.response.data : error.message);
    });
};
export const getAllVersionProcedure = async (procedureId) => {
    try {
      const response = await axios.get(`${api}/procedures/getAllProcedureVersions`, {
        params: { id: procedureId },
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching procedure versions:', error);
      throw error; 
    }
};

export const deleteProcedure = (id) => {
  return axios.delete(`${api}/procedures/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
    toast.success("Procédure supprimée avec succès");
    return id;  
  })
  .catch(error => {
    toast.error(`Erreur lors de la suppression de la procédure: ${error.message}`);
    throw error; 
  });
  };
export const checkIsLastVersion = async (id) => {
  try {
    const response = await axios.get(`${api}/procedures/isLastVersion`,{
      params : {id : id} ,
      headers :{ 'Authorization': `Bearer ${token}`}
  });
    const isLastVersion = response.data;
    console.log(`Is last version: ${isLastVersion}`);
    return isLastVersion;
  } catch (error) {
    console.error('Erreur lors de la vérification de la dernière version:', error);
  }
};
export const modifyProcedure = async (procedureId, procedureName, file) => {
  try {
      const formData = new FormData();
      formData.append('procedureName', procedureName);
      formData.append('file', file);
      
      const response = await axios.patch(`${api}/procedures/${procedureId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      });
      
      toast.success('Procédure mise à jour avec succès');
      return response.data;
  } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      toast.error(`Erreur lors de la mise à jour de la procédure : ${errorMessage}`);
      console.error('Error updating data:', errorMessage);
      throw error;
  }
};