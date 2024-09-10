import axios from 'axios';
import { getToken } from '../../../../services/tokenService'; 
import { toast } from 'react-toastify';


const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken();

export const postNewMarket = (mainObject, file) => {
    const formData = new FormData();
    formData.append('marketUserDto', JSON.stringify(mainObject));
    formData.append('file', file);

    return axios.post(`${api}/markets/marketUsers`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        toast.success('Nouveau marché créé avec succès');
        return response.data;
    })
    .catch(error => {
        if (error.response) {
            if (error.response.status === 409 && error.response.data.error === "User already exists and role doesn't match") { 
                toast.error(`Erreur lors de la création du marché: ${error.response.data.message}`);
            }
          } 
        // toast.error(`Erreur lors de la création du marché: ${error.message}`);
        // throw error;
    });
};

export const updateMarket = (id, mainObject, file) => {
    const formData = new FormData();
    formData.append('marketUserDto', JSON.stringify(mainObject));
    formData.append('file', file);

    return axios.put(`${api}/markets/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        toast.success('Marché mis à jour avec succès');
        return response.data;
    })
    .catch(error => {
        toast.error(`Erreur lors de la mise à jour du marché: ${error.message}`);
        throw error;
    });
};

export const fetchMarketWithUsersById = (id) => {
    try {
        return axios.get(`${api}/markets/marketUsersInfo/${id}`,{ 
            headers: {
            'Authorization': `Bearer ${token}`}});
    } catch (error) {
        console.error('Erreur lors de la récupération des marchés', error);
        throw error; 
    }
    
};
