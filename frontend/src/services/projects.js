import API from './api';


export const getProjects = async () => {
  const response = await API.get('/api/projects');
  return response.data;
};

export const purchaseProject = async (projectId) => {
    const response = await API.post('/api/projects/purchase', { projectId });
    return response.data;
  };

export const getProjectById = async (id) => {
  const response = await API.get(`/api/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  console.log("📦 Creating project:", projectData);
  const response = await API.post('/api/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await API.put(`/api/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(`/api/projects/${id}`);
  return response.data;
};

export const getUnapprovedProjects = async () => {
  const response = await API.get('/api/projects/unapproved');
  return response.data;
};

export const approveProject = async (id) => {
  const response = await API.patch(`/api/projects/${id}/approve`);
  return response.data;
};

export const getPendingProjects = async () => {
    const response = await API.get("/api/admin/projects/pending");
    return response.data;
  };
export const getProjectsByCategory = async (category) => {
  const response = await API.get(`/api/projects/category/${category}`);
  return response.data;
};

export const searchProjects = async (query) => {
  const response = await API.get('/api/projects/search', { params: { q: query } });
  return response.data;
};