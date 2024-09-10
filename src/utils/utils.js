// utils.js

export function validateField(value) {
    if (value.trim() === '') {
      return { borderColor: 'red', errorMessage: 'Ce champ est requis.' };
    }
    return { borderColor: '', errorMessage: '' };
  }
  

  export const formatName = (name, maxLength) => {
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength)}... `;
    }
    return `${name}`;
  };