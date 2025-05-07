import API from './api';

export const register = async (userdata) => {
  const response = await API.post('/api/auth/signup', userdata);
  return response.data;
};

export const login = async (userdata) => {
  const response = await API.post('/api/auth/login', userdata);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/api/auth/me');
  return response.data;
};