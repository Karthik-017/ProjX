import api from './api';

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const getUnapprovedProjects = async () => {
  const response = await api.get('/projects/unapproved');
  return response.data;
};

export const approveProject = async (id) => {
  const response = await api.patch(`/projects/${id}/approve`);
  return response.data;
};

export const getProjectsByCategory = async (category) => {
  const response = await api.get(`/projects/category/${category}`);
  return response.data;
};

export const searchProjects = async (query) => {
  const response = await api.get('/projects/search', { params: { q: query } });
  return response.data;
};