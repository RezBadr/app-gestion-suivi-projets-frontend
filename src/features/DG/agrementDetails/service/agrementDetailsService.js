import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 
import { toast } from 'react-toastify';

const token = getToken();

const api = process.env.REACT_APP_BACKEND_API_URL;
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
export const changeEtat = (id, status, note) => {
  // Encode special characters while keeping spaces
  const encodedNote = encodeURIComponent(note).replace(/%20/g, ' ');

  return axios.put(
    `${api}/Agrements/etat/${id}`,
    null,  // No request body
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        status: status,
        note: encodedNote
      }
    }
  )
  .then(response => {
    toast.success('État mis à jour avec succès')
    return response.data;
  })
  .catch(error => {
    toast.error(`Erreur lors de la mise à jour de l'état: ${error.message}`)
    throw error;
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
export const checkIsLastVersion = async (id) => {
  try {
    const response = await axios.get(`${api}/Agrements/isLastVersion`,{
      params : {id : id} ,
      headers : {'Authorization': `Bearer ${token}`}
  });
    const isLastVersion = response.data;
    console.log(`Is last version: ${isLastVersion}`);
    return isLastVersion;
  } catch (error) {
    console.error('Erreur lors de la vérification de la dernière version:', error);
  }
};
