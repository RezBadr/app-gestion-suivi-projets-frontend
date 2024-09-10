import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 

const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken();


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
    const encodedAgrementId = encodeURIComponent(agrementId);
    axios({
      url: `${api}/Agrements/download/${encodedAgrementId}`,
      responseType: 'blob', 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
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
  
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement du fichier :', error.response ? error.response.data : error.message);
      });
  };
