import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getToken } from './tokenService'; 
import { daDK } from '@mui/material/locale';


const api = process.env.REACT_APP_BACKEND_API_URL;



const BASE_URL = process.env.REACT_APP_BACKEND_AUTH_URL;
const userApi = axios.create({
    baseURL: BASE_URL + 'auth', // Base URL for user-related API calls
});

// Interceptor to add JWT token to requests
userApi.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve token from tokenService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Logout function
export const logout = async () => {
  try {
    const response = await userApi.post('/logout'); // Send logout request
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error); // Log error
    throw error;
  }
};

// Update password function
export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const requestData = {
      oldPassword,
      newPassword
    };
    const response = await userApi.put('/changePassword', requestData); // Send password update request
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error); // Log error
    throw error;
  }
};

// Get user info by ID function
export const getUserInfoById = async (id) => {
  try {
    const response = await userApi.get(`/userInfo/${id}`); // Fetch user info by ID
    return response.data;
  } catch (error) {
    console.error(`Error fetching user info for ID ${id}:`, error); // Log error
    throw error;
  }
};

export const getUserInfo = () => {
  const token = getToken(); 
  if (!token) {
    return null; 
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT
    // Extract the information you need from the decoded token
    return {
      username: decodedToken.sub,         // Email or username
      authority: decodedToken.roles,      // Role of the user
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; // Handle decoding errors, possibly by returning null
  }
};

// Export the Axios instance
export default userApi;



// Fonction pour obtenir le rôle et le mapper
export const getUserRole = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token); // Décode le JWT
    const role = decodedToken.roles; // Supposons que le rôle soit stocké sous 'role'
    
    // Mappez les rôles aux codes abrégés
    const roleMap = {
      CHEFDEPROJET: 'CP',
      CHEFDEQUALITE: 'RQ',
      CHEFDELOT: 'CL',
      QUALITICIEN: 'QU',
      TECHNICIENDETRAVAUX : 'TT',
      ADMIN : 'ADMIN',
      DIRECTEURGENERAL : 'DG'
    };

    return roleMap[role] ; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};



export const getCurrentMarketsOfUser = async () => {
  try {
    const token = getToken(); 
    const response = await axios.get(`${api}/users/currentMarketsOfUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des marchés:', error);
    throw error; 
  }
};

