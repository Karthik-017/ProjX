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
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-48 bg-lightgray rounded"></div>
          <div className="h-80 w-full max-w-4xl bg-lightgray rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-light text-darkgray">
            My <span className="font-medium text-primary">Purchases</span>
          </h1>
          <p className="text-subtlegray mt-2">
            View all projects you've purchased
          </p>
        </div>

        <div className="bg-secondary rounded-xl shadow-sm overflow-hidden border border-midgray">
          {purchases.length > 0 ? (
            <ul className="divide-y divide-lightgray">
              {purchases.map((purchase) => (
                <li key={purchase.id} className="hover:bg-offwhite transition-colors duration-200">
                  <Link
                    to={`/projects/${purchase.projectId}`}
                    className="block"
                  >
                    <div className="px-6 py-5 sm:px-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-light text-darkgray truncate">
                            {purchase.project.title}
                          </h3>
                          <p className="text-sm text-subtlegray mt-1">
                            From: {purchase.project.user.name}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-lightgray text-darkgray">
                            Purchased
                          </span>
                          <p className="text-primary font-medium">
                            ${purchase.priceAtPurchase}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-subtlegray">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(purchase.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16 px-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-midgray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-darkgray">No purchases yet</h3>
              <p className="mt-2 text-subtlegray">
                You haven't purchased any projects yet. Start exploring our marketplace.
              </p>
              <div className="mt-6">
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-sm font-medium text-primary hover:bg-primary hover:text-secondary transition-colors duration-200"
                >
                  Browse Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;