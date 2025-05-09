import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard';
import { getProjects, searchProjects } from '../../services/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let data;
        if (searchQuery) {
          data = await searchProjects(searchQuery);
        } else {
          data = await getProjects();
        }
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          <div className="h-12 w-full max-w-2xl bg-lightgray rounded-lg"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
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
              Browse <span className="font-medium text-primary">Projects</span>
            </h1>
            <p className="text-subtlegray mt-2">
              Find academic projects that match your needs
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-subtlegray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-4 py-3 border border-midgray rounded-lg bg-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-darkgray">No projects found</h3>
            <p className="mt-2 text-subtlegray max-w-md mx-auto">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'There are currently no projects available. Check back later.'}
            </p>
            <div className="mt-6">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/create-project"
                  className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
                >
                  Create First Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;