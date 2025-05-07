import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects";
import ProjectCard from "../../components/ProjectCard";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getProjects();
      setProjects(res);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Submitted Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
// This component fetches and displays the projects submitted by the logged-in user. It uses the ProjectCard component to display each project.