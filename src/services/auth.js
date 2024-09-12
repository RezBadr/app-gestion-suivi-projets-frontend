import axios from 'axios';

const BASE_URL = 'https://adm-projet-backend-app-7ba8b1bdf78d.herokuapp.com/auth';

export const login = async (LoginRequestBody) => {
    try {
      const response = await axios.post( BASE_URL + '/login', LoginRequestBody); // Send login request
      return response.data;
    } catch (error) {
      console.error('Error during login:', error); // Log error
      throw error;
    }
  };