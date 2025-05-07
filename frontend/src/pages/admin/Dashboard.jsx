import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example logout logic (update based on your actual auth context)
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Total Projects</h2>
          <p className="text-2xl">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
          <p className="text-2xl">7</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          <p className="text-2xl">5</p>
        </div>
      </section>

      <section className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Project Alpha was updated</li>
          <li>Task "Finalize Budget" was completed</li>
          <li>New member added: Jane Doe</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
