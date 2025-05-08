import { useEffect, useState } from "react";
import { getProjectById } from "../../services/projects";
import ProjectCard from "../../components/ProjectCard";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getProjectById();
      setPurchases(res);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Purchased Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchases.map((item) => (
          <ProjectCard key={item.project.id} project={item.project} />
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
// This component fetches and displays the projects purchased by the logged-in user. It uses the ProjectCard component to display each project.