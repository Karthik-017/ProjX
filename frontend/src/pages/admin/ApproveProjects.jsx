import { useState, useEffect } from 'react';
import { getUnapprovedProjects, approveProject } from '../../services/projects';
import ProjectCard from '../../components/ProjectCard';

const ApproveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getUnapprovedProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      await approveProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error approving project:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Approve Projects</h1>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <ProjectCard project={project} />
              <button
                onClick={() => handleApprove(project.id)}
                className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Approve Project
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects awaiting approval.</p>
        </div>
      )}
    </div>
  );
};

export default ApproveProjects;