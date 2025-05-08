import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProjects();
      setProjects(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Explore Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Home;
