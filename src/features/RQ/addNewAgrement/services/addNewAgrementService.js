import axios from 'axios';
import { getToken } from '../../../../services/tokenService';
import { toast } from 'react-toastify';

const api = process.env.REACT_APP_BACKEND_API_URL;

const token = getToken();
export const postNewAgrement = async (agrementName, file) => {
  const token = getToken();
  if (!api) {
    throw new Error('API URL is not defined');
  }
  try {
    const formData = new FormData();
    formData.append('AgrementName', agrementName);
    formData.append('file', file);

    const response = await axios.post(`${api}/Agrements/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    toast.success('Agrément créé avec succès');
    return response.data; // Retourne les données de l'agrément créé

  } catch (error) {
    toast.error(`Erreur lors de la création de l'agrément: ${error.response ? error.response.data : error.message}`);
    console.error('Error posting data:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const fetchLastVersionsAgrement = async () => {
    try {
      const response = await axios.get(`${api}/Agrements/versionsFinal`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching agrement versions:", error);
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




