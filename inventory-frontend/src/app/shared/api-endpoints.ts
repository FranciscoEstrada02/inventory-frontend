export const API_BASE_URL_LOGIN = 'http://localhost:4000/auth';
export const API_BASE_URL_INVENTORY = 'http://localhost:4000/api/products';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL_LOGIN}/login`,
    REGISTER: `${API_BASE_URL_LOGIN}/register`
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL_INVENTORY}`,
    GET_ONE: (id: number) => `${API_BASE_URL_INVENTORY}/${id}`,
    CREATE: `${API_BASE_URL_INVENTORY}`,
    UPDATE: (id: number) => `${API_BASE_URL_INVENTORY}/${id}`
  }
};