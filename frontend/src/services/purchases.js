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