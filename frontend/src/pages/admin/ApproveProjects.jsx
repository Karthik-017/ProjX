import { useEffect, useState } from "react";
import { getPendingProjects, approveProject } from "../../services/projects";

const ApproveProjects = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPendingProjects();
      setPending(res);
    };
    fetch();
  }, []);

  const handleApprove = async (id) => {
    await approveProject(id);
    setPending((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Project Approvals</h2>
      {pending.length === 0 ? (
        <p>No pending projects.</p>
      ) : (
        <ul className="space-y-4">
          {pending.map((proj) => (
            <li key={proj.id} className="border p-4 rounded">
              <h3 className="font-semibold">{proj.title}</h3>
              <p className="text-gray-700">{proj.description}</p>
              <button
                onClick={() => handleApprove(proj.id)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApproveProjects;
// This component fetches and displays the projects pending approval. It allows admins to approve each project, removing it from the list once approved.