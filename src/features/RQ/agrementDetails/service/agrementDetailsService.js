import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 
import { toast } from 'react-toastify';


const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken();

export const postNewAgrementVersion = async (agrementId, file) => {
  try {
      const formData = new FormData();
      formData.append('id', agrementId);
      formData.append('file', file);

      const response = await axios.post(`${api}/Agrements/createNewVersion`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      });
      toast.success('Nouvelle version d\'agrément créée avec succès');
      return response.data;
  } catch (error) {
      toast.error(`Erreur lors de la création de la nouvelle version d'agrément: ${error.response ? error.response.data : error.message}`);
      throw error;
  }
};
export const downloadFile = (agrementId) => {
    axios({
        url: `${api}/Agrements/download/${agrementId}`, 
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
export const getAllVersionAgrement = async (agrementId) => {
    try {
      const response = await axios.get(`${api}/Agrements/getAllAgrementVersions`, {
        params: { id: agrementId },
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching agrement versions:', error);
      throw error; 
    }
};
export const deleteAgrement = (id) => {
  return axios.delete(`${api}/Agrements/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
    toast.success("Agrement supprimé avec succès");
    return id;  
  })
  .catch(error => {
    toast.error(`Erreur lors de la suppression de l'agrement: ${error.message}`);
    throw error; 
  });
};
export const checkIsLastVersion = async (id) => {
  try {
    const response = await axios.get(`${api}/Agrements/isLastVersion`,{
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
export const modifyAgrement = async (agrementId, agrementName, file) => {
  try {
      const formData = new FormData();
      formData.append('agrementName', agrementName);
      formData.append('file', file);
      
      const response = await axios.patch(`${api}/Agrements/${agrementId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      });
      
      toast.success('Agréement mis à jour avec succès');
      return response.data;
  } catch (error) {
      toast.error(`Erreur lors de la mise à jour de l'agrément: ${error.response ? error.response.data : error.message}`);
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      throw error;
  }
};