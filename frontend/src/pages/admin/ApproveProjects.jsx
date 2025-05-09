import { useState, useEffect } from 'react';
import { getUnapprovedProjects, approveProject } from '../../services/projects';
import ProjectCard from '../../components/ProjectCard';

const ApproveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

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
      setApprovingId(projectId);
      await approveProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error approving project:', error);
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-lightgray rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-light text-darkgray">
            Approve <span className="font-medium text-primary">Projects</span>
          </h1>
          <p className="text-subtlegray mt-2">
            Review and approve submitted projects
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-secondary rounded-xl shadow-sm border border-midgray overflow-hidden">
                <ProjectCard project={project} />
                <div className="p-4 border-t border-lightgray">
                  <button
                    onClick={() => handleApprove(project.id)}
                    disabled={approvingId === project.id}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ${
                      approvingId === project.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {approvingId === project.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Approving...
                      </>
                    ) : (
                      <>
                        Approve Project
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-darkgray">All Caught Up!</h3>
            <p className="mt-2 text-subtlegray">
              There are no projects awaiting approval at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveProjects;