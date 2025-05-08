import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/solid';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-bold">${project.price}</span>
          <Link
            to={`/projects/${project.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;