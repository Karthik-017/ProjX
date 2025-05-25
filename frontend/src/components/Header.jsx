import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-secondary shadow-sm border-b border-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-light text-primary">
              ProjectMarket
            </Link>
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/projects"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium text-darkgray"
              >
                Browse Projects
              </Link>
              {user && (
                <>
                  <Link
                    to="/my-projects"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-subtlegray hover:text-darkgray hover:border-midgray transition duration-200"
                  >
                    My Projects
                  </Link>
                  <Link
                    to="/my-purchases"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-subtlegray hover:text-darkgray hover:border-midgray transition duration-200"
                  >
                    My Purchases
                  </Link>
                </>
              )}
              {user?.role === "admin" && (
                <>
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-subtlegray hover:text-darkgray hover:border-midgray transition duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/approve-projects"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-subtlegray hover:text-darkgray hover:border-midgray transition duration-200"
                  >
                    Approve Projects
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-darkgray">
                  {user.name}
                </span>
                <Link
                  to="/profile"
                  className="text-subtlegray hover:text-primary transition duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
                <button
                  onClick={logout}
                  className="text-subtlegray hover:text-primary transition duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="text-sm font-medium text-subtlegray hover:text-primary transition duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition duration-200"
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