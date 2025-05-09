import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-offwhite flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl text-center">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light text-darkgray mb-6">
            Welcome to <span className="font-medium text-primary relative">
              ProjectMarket
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary opacity-30"></span>
            </span>
          </h1>
          <p className="text-xl text-subtlegray mb-10 leading-relaxed max-w-2xl mx-auto">
          Buy and sell academic projects with confidence and ease          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            to="/projects"
            className="group px-8 py-3.5 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <span>Browse Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          
          <Link
            to="/create-project"
            className="group px-8 py-3.5 border border-primary rounded-md text-sm font-medium text-primary hover:text-darkgray hover:border-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <span>Sell Your Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>

        <div className="mt-16 border-t border-lightgray pt-8 animate-fade-in-delay">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['NIE', 'Stanford', 'MIT', 'ATME', 'Cambridge'].map((uni) => (
              <span key={uni} className="text-sm text-subtlegray hover:text-darkgray transition-colors duration-200">
                {uni}
              </span>
            ))}
          </div>
          <p className="text-xs text-subtlegray">
            Trusted by students and researchers at 100+ leading institutions worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;