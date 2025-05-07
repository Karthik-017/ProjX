import { useState } from "react";
import { createProject } from "../../services/projects";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    technologies: "",
    deployedUrl: "",
    videoUrl: "",
    documentsUrl: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(form);
      navigate("/my-projects");
    } catch {
      setMessage("Failed to submit project");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit New Project</h2>
      {message && <p className="text-red-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Web, AI, ML)"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma-separated)"
          className="w-full p-2 border rounded"
          value={form.technologies}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="deployedUrl"
          placeholder="Deployed URL (if any)"
          className="w-full p-2 border rounded"
          value={form.deployedUrl}
          onChange={handleChange}
        />
        <input
          type="url"
          name="videoUrl"
          placeholder="Demo Video URL"
          className="w-full p-2 border rounded"
          value={form.videoUrl}
          onChange={handleChange}
        />
        <input
          type="url"
          name="documentsUrl"
          placeholder="Project Documents URL"
          className="w-full p-2 border rounded"
          value={form.documentsUrl}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (e.g., 299.99)"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
