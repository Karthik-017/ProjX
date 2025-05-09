import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LogoutIcon, UserIcon } from '@heroicons/react/outline';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              ProjectMarket
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/projects"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
              >
                Browse Projects
              </Link>
              {user && (
                <>
                  <Link
                    to="/my-projects"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    My Projects
                  </Link>
                  <Link
                    to="/my-purchases"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    My Purchases
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <>
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                  Admin
                </Link>
                <Link
                to="/approve-projects"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                Approve Projects
              </Link>
              </>
              )}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogoutIcon className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;