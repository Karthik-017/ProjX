import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, purchaseProject } from "../../services/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setMessage("Failed to load project");
      }
    };
    fetch();
  }, [id]);

  const handlePurchase = async () => {
    try {
      await purchaseProject(id);
      navigate("/purchases");
    } catch {
      setMessage("Failed to purchase project");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <p className="text-sm text-gray-500 mb-4">By: {project.creator.firstName}</p>
      <button
        onClick={handlePurchase}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Purchase
      </button>
    </div>
  );
};

export default ProjectDetails;
// This component fetches and displays the details of a specific project. It also allows users to purchase the project.