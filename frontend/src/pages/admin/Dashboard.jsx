import { useState, useEffect } from 'react';
import { getUsers } from '../../services/users';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="h-12 w-64 bg-lightgray rounded-lg"></div>
          <div className="h-16 bg-lightgray rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-12 bg-lightgray rounded-lg"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-lightgray rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-light text-darkgray">
            Admin <span className="font-medium text-primary">Dashboard</span>
          </h1>
          <p className="text-subtlegray mt-2">
            Manage users and platform content
          </p>
        </div>

        <div className="bg-secondary rounded-xl shadow-sm overflow-hidden border border-midgray">
          <div className="px-6 py-5 border-b border-lightgray bg-offwhite">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-medium text-darkgray">
                Users <span className="text-subtlegray font-normal">({users.length})</span>
              </h3>
              {/* <div className="mt-2 sm:mt-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-subtlegray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="block w-full pl-10 pr-4 py-2 border border-midgray rounded-md bg-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition duration-200"
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-lightgray">
              <thead className="bg-offwhite">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-subtlegray uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-subtlegray uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-subtlegray uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-subtlegray uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-secondary divide-y divide-lightgray">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-offwhite transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-darkgray">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-subtlegray">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-primary text-secondary' 
                          : 'bg-lightgray text-darkgray'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-subtlegray">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-midgray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-darkgray">No Users Found</h3>
              <p className="mt-2 text-subtlegray">There are currently no users registered on the platform.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;