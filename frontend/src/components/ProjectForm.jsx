import { useState } from 'react';

const ProjectForm = ({ 
  initialData, 
  onSubmit, 
  error,
  isLoading = false,
  cancelAction = null
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'AIML',
    technologies: initialData?.technologies || '',
    price: initialData?.price || '',
    deployedUrl: initialData?.deployedUrl || '',
    videoUrl: initialData?.videoUrl || '',
    documentsUrl: initialData?.documentsUrl || '',
    folderUrl: initialData?.folderUrl || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-16 bg-lightgray rounded-lg"></div>
          ))}
          <div className="h-12 bg-lightgray rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-secondary rounded-xl shadow-sm border border-midgray p-6 sm:p-8">
        <h1 className="text-2xl font-light text-darkgray mb-2">
          {initialData ? 'Edit' : 'Create'} <span className="font-medium text-primary">Project</span>
        </h1>
        <p className="text-subtlegray mb-6">
          {initialData ? 'Update your project details' : 'Fill in the details to create a new project'}
        </p>

        {error && (
          <div className="mb-6 p-4 border-l-4 border-primary bg-lightgray">
            <p className="text-darkgray">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-darkgray mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-darkgray mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-darkgray mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            >
              <option value="AIML">AI/ML</option>
              <option value="WEB">Web</option>
              <option value="ANDROID">Android</option>
              <option value="HARDWARE">Hardware</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          {/* Technologies */}
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-darkgray mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              placeholder="e.g. React, Node.js, MongoDB"
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-darkgray mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Deployed URL */}
          <div>
            <label htmlFor="deployedUrl" className="block text-sm font-medium text-darkgray mb-1">
              Deployed URL (optional)
            </label>
            <input
              type="url"
              id="deployedUrl"
              name="deployedUrl"
              value={formData.deployedUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Video URL */}
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-darkgray mb-1">
              Video URL (optional)
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Documents URL */}
          <div>
            <label htmlFor="documentsUrl" className="block text-sm font-medium text-darkgray mb-1">
              Documents URL (optional)
            </label>
            <input
              type="url"
              id="documentsUrl"
              name="documentsUrl"
              value={formData.documentsUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Folder URL */}
          <div>
            <label htmlFor="folderUrl" className="block text-sm font-medium text-darkgray mb-1">
              Google Drive Folder URL (optional)
            </label>
            <input
              type="url"
              id="folderUrl"
              name="folderUrl"
              value={formData.folderUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>

          {/* Buttons */}
          <div className={`pt-6 ${cancelAction ? 'flex justify-end space-x-4' : ''}`}>
            {cancelAction && (
              <button
                type="button"
                onClick={cancelAction}
                className="px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`${cancelAction ? '' : 'w-full'} flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
            >
              {initialData ? 'Save Changes' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;