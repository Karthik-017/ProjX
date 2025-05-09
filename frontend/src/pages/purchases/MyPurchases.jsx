import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPurchasesByUser } from '../../services/purchases';
import AuthContext from '../../context/AuthContext';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        if (user) {
          const data = await getPurchasesByUser(user.id);
          setPurchases(data);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading your purchases...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Purchases</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {purchases.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <li key={purchase.id}>
                <Link
                  to={`/projects/${purchase.projectId}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {purchase.project.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Purchased
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          From: {purchase.project.user.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Price: ${purchase.priceAtPurchase} • {new Date(purchase.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't purchased any projects yet.</p>
            <Link
              to="/projects"
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Browse Projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;