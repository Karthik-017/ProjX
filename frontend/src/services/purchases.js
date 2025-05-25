// src/services/purchases.js
import api from './api';

export const getPurchasesByUser = async (userId) => {
  const response = await api.get(`/purchases/user/${userId}`);
  return response.data;
};

export const createPurchase = async (projectId) => {
  const response = await api.post('/purchases', { projectId });
  return response.data;
};

export const getEligibleSellers = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await api.get(`/users/monitor/sellers?${queryParams}`);
  return response.data;
};

export const fetchSellerPurchases = async () => {
  const response = await api.get('/purchases/seller/monitor');
  return response.data;
};