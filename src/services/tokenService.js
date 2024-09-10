import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const TOKEN_KEY = 'jwt';
const USER_INFO_KEY = 'user';

export const saveToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Le token expirera dans 7 jours
};

export  const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const saveUserInfo = (userInfo) => {
  Cookies.set(USER_INFO_KEY, JSON.stringify(userInfo), { expires: 7 }); // Les informations de l'utilisateur expireront dans 7 jours
};

export const getUserInfo = () => {
  const userInfoString = Cookies.get(USER_INFO_KEY);
  return userInfoString ? JSON.parse(userInfoString) : null;
};

export const removeUserInfo = () => {
  Cookies.remove(USER_INFO_KEY);
};

export const isAuthenticated = () => {
  return !!getToken(); // Vérifie si le token existe dans les cookies
};

export const getUserInfoFromToken = () => {
  const token = getToken();
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const decodedToken = jwtDecode(token);

    // Vérifiez que firstname et lastname sont bien présents dans le JWT
    const firstname = decodedToken?.firstname;
    const lastname = decodedToken?.lastname;

    if (!firstname || !lastname) {
      throw new Error('Firstname or lastname not found in token');
    }

    return { firstname, lastname };
  } catch (error) {
    console.error('Failed to decode token or extract user information:', error);
    throw new Error('Invalid token');
  }
};

