import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 
import { toast } from 'react-toastify';

const api = process.env.REACT_APP_BACKEND_API_URL;

const token = getToken();
export const postNewProcedure = async (procedureName, file) => {
  const token = getToken();

  try {
    const formData = new FormData();
    formData.append('ProcedureName', procedureName);
    formData.append('file', file);

    const response = await axios.post(`${api}/procedures/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    toast.success('Procédure créée avec succès');
    return response.data; // Retourne les données de la procédure créée

  } catch (error) {
    toast.error(`Erreur lors de la création de la procédure: ${error.response ? error.response.data : error.message}`);
    throw error;
  }
};
export const fetchLastVersionsProcedure = async () => {
  try {
    const response = await axios.get(`${api}/procedures/versionsFinal`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching procedure versions:", error);
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

      const disposition = response.headers.get('content-disposition');
      console.log(disposition);  // For debugging
      const filename = disposition
          ? disposition.split('filename=')[1].replace(/"/g, '')
          : 'default-filename.pdf';  

      link.setAttribute('download', filename); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
      console.error('Erreur lors du téléchargement du fichier :', error.response ? error.response.data : error.message);
  });
};




