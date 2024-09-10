import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../../../services/tokenService'; 


const api = process.env.REACT_APP_BACKEND_API_URL;




const userApi = axios.create({
    baseURL: api + '/admin', 
});

userApi.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createNewUser = async (userData) => {
  try {
    const response = await userApi.post('/addNewUser', userData); 
    return response.data;
  } catch (error) {
    console.error('Error during create user ', error); 
    throw error;
  }
};

export const resetPassword = async (userId) => {
  try {
    const response = await userApi.post(`/resetPassword/${userId}`); // Send password update request
    return response.data;
  } catch (error) {
    console.error('Error reset password:', error); 
    throw error;
  }
};
export const deleteUser = async (userId) => {
    try {
      const response = await userApi.delete(`/deleteUser/${userId}`); // Send password update request
      return response.data;
    } catch (error) {
      console.error( "Error delete user ", error); 
      throw error;
    }
  };

export const getAllUsers = async () => {
  try {
    const response = await userApi.get(`/getAllUsers`); 
    return response.data;
  } catch (error) {
    console.error("Error get all users " ,error); 
    throw error;
  }
};
export const updateUser = async (userId, updatedData) => {
    try {
      const response = await userApi.put(`/updateUser/${userId}`, updatedData); 
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error); 
      throw error;
    }
  };