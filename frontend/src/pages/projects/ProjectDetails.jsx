import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../../services/projects";
import { createPurchase, getPurchasesByUser } from "../../services/purchases";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api"; // Ensure you have this import

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

        // Check if user has purchased this project
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

  if (loading) return <div className="text-center py-8">Loading project details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!project) return <div className="text-center py-8">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Posted by {project.user.name} •{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {/* Description & Details */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-gray-900">{project.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Technologies</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-gray-900">${project.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-gray-900">
                  {project.isApproved ? "Approved" : "Pending Approval"}
                </p>
              </div>
            </div>
          </div>

          {/* Deployed Link */}
          {project.deployedUrl && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Deployed Link</h2>
              <a
                href={project.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                {project.deployedUrl}
              </a>
            </div>
          )}

          {/* Video */}
          {project.videoUrl && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Video Explanation</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={project.videoUrl.replace("watch?v=", "embed/")}
                  className="w-full h-64 rounded-md"
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Conditional Private URLs */}
          {showPrivateUrls && project.documentsUrl && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Documents</h2>
              <a
                href={project.documentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                View Project Documents
              </a>
            </div>
          )}

          {showPrivateUrls && project.folderUrl && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Project Files</h2>
              <a
                href={project.folderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Access Project Folder
              </a>
            </div>
          )}

          {!showPrivateUrls && user && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-yellow-700">
                Purchase this project to access documents and files
              </p>
            </div>
          )}

          {/* Purchase / Edit Controls */}
          <div className="flex justify-between items-center mt-8">
            {user && user.id !== project.userId && (
              <div className="flex flex-col">
                {hasPurchased ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-center">
                    Purchased
                  </span>
                ) : (
                  <>
                    <button
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                        purchaseLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {purchaseLoading ? 'Processing...' : 'Purchase Project'}
                    </button>
                    {purchaseError && (
                      <p className="mt-2 text-sm text-red-500">{purchaseError}</p>
                    )}
                  </>
                )}
              </div>
            )}

            {user && user.id === project.userId && (
              <Link
                to={`/projects/${project.id}/edit`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
