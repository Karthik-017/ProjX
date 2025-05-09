import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-secondary group rounded-xl shadow-sm overflow-hidden border border-midgray hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-darkgray group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <span className="text-primary font-medium bg-lightgray px-3 py-1 rounded-full text-sm">
            ${project.price}
          </span>
        </div>

        <p className="text-subtlegray text-sm mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-lightgray text-darkgray text-xs rounded-full 
                         hover:bg-primary hover:text-secondary transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-lightgray">
          <Link
            to={`/projects/${project.id}`}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-primary rounded-md 
                      text-sm font-medium text-primary hover:bg-primary hover:text-secondary 
                      transition-all duration-200 ease-in-out"
          >
            View Project Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;