import axios from 'axios';

const BASE_URL = 'http://localhost:8080/auth';

export const login = async (LoginRequestBody) => {
    try {
      const response = await axios.post( BASE_URL + '/login', LoginRequestBody); // Send login request
      return response.data;
    } catch (error) {
      console.error('Error during login:', error); // Log error
      throw error;
    }
  };