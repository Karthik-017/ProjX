import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard';
import { getProjects, getAllProjectsBulk } from '../../services/projects';
import AuthContext from '../../context/AuthContext';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjectsBulk();
        const myProjects = allProjects.filter(project => project.userId === user.id);
        setProjects(myProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          <div className="h-12 w-48 bg-lightgray rounded-lg"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-lightgray rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-light text-darkgray">
              My <span className="font-medium text-primary">Projects</span>
            </h1>
            <p className="text-subtlegray mt-2">
              Manage and view all projects you've created
            </p>
          </div>
          
          <Link
            to="/create-project"
            className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
          >
            Create New Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-secondary rounded-xl shadow-sm border border-midgray py-16 px-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-midgray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-darkgray">No Projects Yet</h3>
            <p className="mt-2 text-subtlegray max-w-md mx-auto">
              You haven't created any projects yet. Get started by creating your first project.
            </p>
            <div className="mt-6">
              <Link
                to="/create-project"
                className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
              >
                Create First Project
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;