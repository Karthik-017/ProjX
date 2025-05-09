import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../../services/projects';
import AuthContext from '../../context/AuthContext';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'AIML',
    technologies: '',
    price: 0,
    deployedUrl: '',
    videoUrl: '',
    documentsUrl: '',
    folderUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectById(id);

        if (project.userId !== user?.id) {
          navigate('/');
          return;
        }

        setFormData({
          title: project.title,
          description: project.description,
          category: project.category,
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(', ')
            : project.technologies,
          price: project.price,
          deployedUrl: project.deployedUrl || '',
          videoUrl: project.videoUrl || '',
          documentsUrl: project.documentsUrl || '',
          folderUrl: project.folderUrl || ''
        });
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(id, {
        ...formData,
        technologies: Array.isArray(formData.technologies)
          ? formData.technologies.join(', ')
          : formData.technologies,
        price: parseFloat(formData.price)
      });
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update project');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading project...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Project</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="AIML">AI/ML</option>
            <option value="IoT">IoT</option>
            <option value="Web Dev">Web Development</option>
            <option value="Mobile">Mobile Development</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
            Technologies Used (comma separated)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            required
            value={formData.technologies}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            required
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="deployedUrl" className="block text-sm font-medium text-gray-700">
            Deployed URL (optional)
          </label>
          <input
            type="url"
            id="deployedUrl"
            name="deployedUrl"
            value={formData.deployedUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL (optional)
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="documentsUrl" className="block text-sm font-medium text-gray-700">
            Documents URL (optional)
          </label>
          <input
            type="url"
            id="documentsUrl"
            name="documentsUrl"
            value={formData.documentsUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="folderUrl" className="block text-sm font-medium text-gray-700">
            Folder URL (optional)
          </label>
          <input
            type="url"
            id="folderUrl"
            name="folderUrl"
            value={formData.folderUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
