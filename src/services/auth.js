import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_AUTH_URL;

export const login = async (LoginRequestBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, LoginRequestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Utilisé si vous gérez les cookies ou l'authentification basée sur les sessions
    });
    return response.data;
  } catch (error) {
    // Gestion plus détaillée des erreurs
    if (error.response) {
      // Réponse reçue avec un code d'erreur de la part du serveur
      console.error('Error response from server:', error.response.status, error.response.data);
    } else if (error.request) {
      // Aucun retour de réponse du serveur
      console.error('No response received:', error.request);
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Error during request setup:', error.message);
    }
    throw error;
  }
};
