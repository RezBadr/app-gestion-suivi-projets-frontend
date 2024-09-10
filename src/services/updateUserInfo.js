import axios from 'axios';
import { getToken } from './tokenService'; 

const api = process.env.REACT_APP_BACKEND_API_URL;
const token = getToken(); 


export const updateUserInfo = async (formData) => {
    try {

      const response = await axios.patch(`${api}/users/updateUserInfo`, null, {
        params: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      throw new Error('Une erreur est survenue. Veuillez réessayer.');
    }
};

export const updateUserInfoSettings = async (formData) => {
  try {
    // Check if password and password confirmation match
    if (formData.password && formData.password !== formData.passwordConfirmation) {
      throw new Error("Passwords do not match");
    }

    const dataToUpdate = new URLSearchParams();

    if (formData.firstName) dataToUpdate.append('firstName', formData.firstName);
    if (formData.lastName) dataToUpdate.append('lastName', formData.lastName);
    if (formData.phoneNumber) dataToUpdate.append('phoneNumber', formData.phoneNumber);
    if (formData.email) dataToUpdate.append('email', formData.email);
    if (formData.password) dataToUpdate.append('password', formData.password);

    const response = await axios.patch(`${api}/users/updateUserInfo`, dataToUpdate, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409 && error.response.data.error === 'Phone Number Already Exists') { 
        throw new Error('Ce numéro de téléphone est déjà utilisé.');
      }
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Une erreur est survenue. Veuillez réessayer.');
  }
};



export const isUserInfoMissing = async () => {
  try {
      const response = await axios.get(`${api}/users/hasFirstAndLastName`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log("testing",response.data)
      return response.data; // Renvoie la valeur boolean
  } catch (error) {
      console.error('Erreur lors de la vérification du nom et prénom :', error);
      throw error; // Relance l'erreur pour permettre à l'appelant de la gérer
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const token = getToken(); 
    const response = await axios.get(`${api}/users/authentifiedUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error;
  }
};