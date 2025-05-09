import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to ProjectMarket</h1>
      <p className="text-xl text-gray-600 mb-8">
        Buy and sell academic projects with ease
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/projects"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Browse Projects
        </Link>
        <Link
          to="/create-project"
          className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
        >
          Sell Your Project
        </Link>
      </div>
    </div>
  );
};

export default Home;