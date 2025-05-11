import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../../services/projects';
import AuthContext from '../../context/AuthContext';
import ProjectForm from '../../components/ProjectForm';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    price: '',
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

        const formattedData = {
          title: project.title,
          description: project.description,
          category: project.category,
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(', ')
            : project.technologies,
          price: project.price.toString(),
          deployedUrl: project.deployedUrl || '',
          videoUrl: project.videoUrl || '',
          documentsUrl: project.documentsUrl || '',
          folderUrl: project.folderUrl || ''
        };

        setProjectData(formattedData);
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await updateProject(id, {
        ...formData,
        technologies: Array.isArray(formData.technologies)
          ? formData.technologies.join(', ')
          : formData.technologies
      });
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update project');
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${id}`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-offwhite flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="text-center text-3xl font-light text-primary mb-2">
          Edit Project
        </h2>
        <p className="text-center text-sm text-subtlegray">
          Update your existing project details
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl lg:max-w-5xl">
        <div className="bg-secondary py-10 px-6 shadow-sm rounded-lg sm:px-10">
          {error && !loading && (
            <div className="mb-6 border-l-4 border-primary p-4 bg-lightgray">
              <p className="text-sm text-darkgray">{error}</p>
            </div>
          )}

          {!loading && (
            <ProjectForm
              initialData={projectData}
              onSubmit={handleSubmit}
              error=""
              isLoading={loading}
              cancelAction={handleCancel}
              customClasses={{
                formContainer: "",
                inputClass:
                  "appearance-none block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 ease-in-out",
                labelClass: "block text-sm font-medium text-darkgray mb-1",
                buttonClass:
                  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProject;