import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-lightgray"></div>
          <div className="h-4 w-48 bg-lightgray rounded"></div>
          <div className="h-4 w-32 bg-lightgray rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-secondary rounded-xl shadow-sm overflow-hidden border border-midgray">
          {/* Profile Header */}
          <div className="px-6 py-5 sm:px-8 border-b border-lightgray bg-offwhite">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-light text-darkgray">
                  User <span className="font-medium text-primary">Profile</span>
                </h3>
                <p className="text-sm text-subtlegray mt-1">
                  Manage your account information
                </p>
              </div>
              <Link
                to="/edit-profile"
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
              >
                Edit Profile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-subtlegray">Full name</dt>
                  <dd className="mt-1 text-base text-darkgray font-light">{profile.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-subtlegray">Email address</dt>
                  <dd className="mt-1 text-base text-darkgray font-light">{profile.email}</dd>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-subtlegray">Account role</dt>
                  <dd className="mt-1">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      profile.role === 'admin' 
                        ? 'bg-primary text-secondary' 
                        : 'bg-lightgray text-darkgray'
                    }`}>
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-subtlegray">Member since</dt>
                  <dd className="mt-1 text-base text-darkgray font-light">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
              </div>
            </div>

            {/* Additional Profile Actions */}
            <div className="mt-12 pt-8 border-t border-lightgray">
              <h4 className="text-sm font-medium text-subtlegray mb-4">Account actions</h4>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/change-password"
                  className="text-sm font-medium text-primary hover:text-darkgray transition-colors duration-200 flex items-center"
                >
                  Change Password
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </Link>
                <Link
                  to="/my-projects"
                  className="text-sm font-medium text-primary hover:text-darkgray transition-colors duration-200 flex items-center"
                >
                  View My Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;