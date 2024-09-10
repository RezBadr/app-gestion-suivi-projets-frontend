// services/fileUploadService.js

import axios from 'axios';
import { getToken } from '../../services/tokenService'; 


const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken(); 


export const createValidation = async (validationDtoReceived, filesWithClassement, PvFilesWithClassement) => {
    const formData = new FormData();

    formData.append('validationDtoReceived', JSON.stringify(validationDtoReceived));

    filesWithClassement.forEach((file, name) => {
        formData.append(`filesWithClassement[${name}]`, file);
    });

    PvFilesWithClassement.forEach((file, name) => {
        formData.append(`PvFilesWithClassement[${name}]`, file);
    });

    try {
        const response = await axios.post(`${api}/validationFiles/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        throw error;
    }
};

//fetch fiche validatio 

export const getValidationFileWithPrestation = async (prestation) => {
    try {
        const response = await axios.get(`${api}/validationFiles/getValidationFileWithPrestation`, {
            params: { Prestation: prestation },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching validation file:', error);
        throw error;
    }
};



export const getValidationFileWithMarketAndPrestation = async (marketid, prestation) => {
    try {
      console.log("it's here " ,prestation ,marketid)
        const response = await axios.get(`${api}/validationFiles/getValidationFileWithMarketAndPrestation/${marketid}`, {
            params: { Prestation: prestation },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching validation file:', error);
        throw error;
    }
};



export const changeEtat = (id, status, note) => {
    // Encode special characters while keeping spaces
    const encodedNote = encodeURIComponent(note).replace(/%20/g, ' ');
  
    return axios.put(
      `${api}/validationFiles/etat/${id}`,
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
      console.log('État mis à jour avec succès');
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'état', error);
      throw error; // Re-throw the error if you want to handle it later
    });
  };

  export const downloadFiles = async (ficheValidationId, fileName) => {
    try {
        const response = await axios.get(`${api}/validationFiles/download-files/${ficheValidationId}`, {
            params: { fileName: fileName, },
            responseType: 'blob', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.zip'); // Set the file name
        document.body.appendChild(link);
        link.click();

        // Cleanup: remove the link after triggering the download
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        //return response.data;
    } catch (error) {
        console.error('Error fetching validation file:', error);
        throw error;
    }
};
  


export const getPks = async (prestation) =>{
    try{
  
      const response = await axios.get(`${api}/validationFiles/pks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params : {prestation : prestation}
      });
      return response.data; 
  
    }catch(error){
      console.log(error)
    }
  }


  export const getPksByMarket = async (marketId , prestation) =>{
    try{
  
      const token = getToken(); 
      const response = await axios.get(`${api}/validationFiles/pksWithM/${marketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        params : {prestation : prestation}
      });
      return response.data; 
  
    }catch(error){
      console.log(error)
    }
  }

  export const updateValidationFile = async (id, pkStartRight, pkEndRight, pkStartLeft, pkEndLeft, couche) => {
    try {
        const token = getToken(); 
        const response = await axios.patch(`${api}/validationFiles/update-validation-file/${id}`, null,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            pkStartRight,
            pkEndRight,
            pkStartLeft,
            pkEndLeft,
            couche
          }
            
        });

        return response.data;
    } catch (error) {
        console.error('Error updating validation file:', error);
        throw error;
    }
};



export const updateFileOfValidationFile = async (id, fileName, file, natureFile) => {
  const formData = new FormData();
  formData.append('fileName', fileName);
  formData.append('file', file);
  switch (natureFile.toLowerCase()) {
    case 'pv':
      formData.append('natureFile',false);
      break;
    case 'fv':
      formData.append('natureFile', true);
      break;
    default:
      return;
  }
    
  try {
    const response = await axios.put(`${api}/validationFiles/update-file-of-validation-file/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating file of validation file:', error);
    throw error;
  }
};




export const fetchGraphe = async (marketId, prestation, grapheNature) => {
  const token = getToken(); // Récupère le token pour l'authentification

  try {
    const response = await axios.get(`${api}/graphes/${marketId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
      },
      params: {
        prestation, // Pas besoin de doubler les noms si les variables et clés ont le même nom
        grapheNature,
      },
    });

    return response.data; // Retourne les données du graphe
  } catch (error) {
    if (error.response) {
      // Erreur côté serveur
      console.error(`Server error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // Erreur de réseau ou pas de réponse du serveur
      console.error('Network error or no response from server:', error.request);
    } else {
      // Autre type d'erreur
      console.error('Error during request setup:', error.message);
    }
    throw error; // Relance l'erreur pour la gérer ailleurs si nécessaire
  }
};



export const uploadGraphe = async (prestation, grapheNature, data) => {
  try {
      const response = await axios.post(
          `${api}/graphes`, 
          data,
          {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              params: {
                  prestation: prestation,
                  grapheNature: grapheNature
              }
          }
      );
      console.log('Graphe uploaded successfully:', response.data);
  } catch (error) {
      console.error('Error uploading graphe:', error);
  }
};


