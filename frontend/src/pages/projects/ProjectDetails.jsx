import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../../services/projects";
import { createPurchase, getPurchasesByUser } from "../../services/purchases";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [showPrivateUrls, setShowPrivateUrls] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);

        if (user) {
          const purchases = await getPurchasesByUser(user.id);
          const purchased = purchases.some((p) => p.projectId === parseInt(id));
          setHasPurchased(purchased);
        }
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user]);

  useEffect(() => {
    if (user) {
      const checkAccess = async () => {
        try {
          const response = await api.get(`/projects/${id}`);
          setShowPrivateUrls(
            response.data.documentsUrl !== null || 
            response.data.folderUrl !== null
          );
        } catch (err) {
          console.error('Error checking access:', err);
        }
      };
      checkAccess();
    }
  }, [user, id]);

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.id === project.userId) {
      setPurchaseError("You can't purchase your own project");
      return;
    }

    try {
      setPurchaseLoading(true);
      setPurchaseError("");

      await createPurchase(project.id);
      navigate("/my-purchases", { state: { purchaseSuccess: true } });
    } catch (err) {
      setPurchaseError(
        err.response?.data?.message || "Failed to complete purchase"
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          <div className="h-96 w-full max-w-4xl bg-lightgray rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-secondary p-8 rounded-xl border border-midgray shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-darkgray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-darkgray mb-2">Please Signin to view Projects</h3>
          <p className="text-subtlegray mb-6">{error}</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
          >
            Signin to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-secondary p-8 rounded-xl border border-midgray shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-darkgray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-darkgray mb-2">Project Not Found</h3>
          <p className="text-subtlegray mb-6">The requested project could not be found.</p>
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-secondary rounded-xl shadow-sm overflow-hidden border border-midgray">
          {/* Project Header */}
          <div className="px-6 py-5 sm:px-8 border-b border-lightgray bg-offwhite">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-light text-darkgray">
                  {project.title}
                </h1>
                <p className="text-subtlegray mt-1">
                  Posted by {project.user.name} • {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {user && user.id === project.userId && (
                <Link
                  to={`/projects/${project.id}/edit`}
                  className="flex items-center px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
                >
                  Edit Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className="px-6 py-8 sm:px-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-darkgray mb-3">Description</h2>
              <p className="text-subtlegray leading-relaxed">{project.description}</p>
            </div>

            {/* Details Grid */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-darkgray mb-3">Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-subtlegray mb-1">Category</p>
                  <p className="text-darkgray">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-subtlegray mb-1">Technologies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-lightgray text-darkgray text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-subtlegray mb-1">Price</p>
                  <p className="text-primary font-medium">${project.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-subtlegray mb-1">Status</p>
                  <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                    project.isApproved ? 'bg-primary text-secondary' : 'bg-lightgray text-darkgray'
                  }`}>
                    {project.isApproved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>
            </div>

            {/* Deployed Link */}
            {project.deployedUrl && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-darkgray mb-3">Deployed Link</h2>
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-darkgray transition-colors duration-200 break-all"
                >
                  {project.deployedUrl}
                </a>
              </div>
            )}

            {/* Video */}
            {project.videoUrl && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-darkgray mb-3">Video Explanation</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={project.videoUrl.replace("watch?v=", "embed/")}
                    className="w-full h-64 rounded-md border border-midgray"
                    title="Project Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Private URLs */}
            {showPrivateUrls && project.documentsUrl && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-darkgray mb-3">Documents</h2>
                <a
                  href={project.documentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-darkgray transition-colors duration-200"
                >
                  View Project Documents
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {showPrivateUrls && project.folderUrl && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-darkgray mb-3">Project Files</h2>
                <a
                  href={project.folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-darkgray transition-colors duration-200"
                >
                  Access Project Folder
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {!showPrivateUrls && user && (
              <div className="mb-8 p-4 border-l-4 border-primary bg-lightgray">
                <p className="text-darkgray">
                  Purchase this project to access documents and files
                </p>
              </div>
            )}

            {/* Purchase Button */}
            {user && user.id !== project.userId && (
              <div className="mt-8 pt-6 border-t border-lightgray">
                {hasPurchased ? (
                  <div className="flex items-center justify-center px-4 py-2 bg-lightgray text-darkgray rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Project Purchased
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <button
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className={`px-6 py-3 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ${
                        purchaseLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {purchaseLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Purchase...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Purchase Project for ${project.price}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </span>
                      )}
                    </button>
                    {purchaseError && (
                      <p className="mt-2 text-sm text-primary text-center">{purchaseError}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;