// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createProject } from '../../services/projects';
// import AuthContext from '../../context/AuthContext';
// import ProjectForm from '../../components/ProjectForm';

// const CreateProject = () => {
//   const [error, setError] = useState('');
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (formData) => {
//     try {
//       await createProject(formData);
//       navigate('/my-projects');
//     } catch (err) {
//       setError(err.message || 'Failed to create project');
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-offwhite flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-3xl font-light text-primary mb-2">
//           Create New Project
//         </h2>
//         <p className="text-center text-sm text-subtlegray">
//           Share your project with our community
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
//         <div className="bg-secondary py-10 px-6 shadow-sm rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-6 border-l-4 border-primary p-4 bg-lightgray">
//               <p className="text-sm text-darkgray">{error}</p>
//             </div>
//           )}
          
//           <ProjectForm 
//             onSubmit={handleSubmit} 
//             error="" 
//             customClasses={{
//               formContainer: "",
//               inputClass: "appearance-none block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 ease-in-out",
//               labelClass: "block text-sm font-medium text-darkgray mb-1",
//               buttonClass: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProject;

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projects';
import AuthContext from '../../context/AuthContext';
import ProjectForm from '../../components/ProjectForm';

const CreateProject = () => {
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createProject(formData);
      navigate('/my-projects');
    } catch (err) {
      setError(err.message || 'Failed to create project');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-offwhite flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="text-center text-3xl font-light text-primary mb-2">
          Create New Project
        </h2>
        <p className="text-center text-sm text-subtlegray">
          Share your project with our community
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl lg:max-w-5xl">
        <div className="bg-secondary py-10 px-6 shadow-sm rounded-lg sm:px-10">
          {error && (
            <div className="mb-6 border-l-4 border-primary p-4 bg-lightgray">
              <p className="text-sm text-darkgray">{error}</p>
            </div>
          )}
          
          <ProjectForm 
            onSubmit={handleSubmit} 
            error="" 
            customClasses={{
              formContainer: "",
              inputClass: "appearance-none block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 ease-in-out",
              labelClass: "block text-sm font-medium text-darkgray mb-1",
              buttonClass: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;