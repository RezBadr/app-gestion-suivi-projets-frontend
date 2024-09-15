import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 


const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken();

// Fonction pour obtenir les marchés actuels
export const getCurrentMarkets = async () => {
    try {
        const response = await axios.get(`${api}/markets`,{ 
            headers: {
            'Authorization': `Bearer ${token}`}});
        return response.data; // Retourne les données des marchés actuels
    } catch (error) {
        console.error('Erreur lors de la récupération des marchés actuels', error);
        throw error; // Relancer l'erreur pour que l'appelant puisse la gérer
    }
};