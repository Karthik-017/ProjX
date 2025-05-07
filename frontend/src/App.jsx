import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projects from './pages/projects/Projects';
import ProjectDetails from './pages/projects/ProjectDetails';
import CreateProject from './pages/projects/CreateProject';
import MyProjects from './pages/projects/MyProjects';
import MyPurchases from './pages/purchases/MyPurchases';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import ApproveProjects from './pages/admin/ApproveProjects';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/my-purchases" element={<MyPurchases />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin-only routes */}
              <Route element={<PrivateRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/approve-projects" element={<ApproveProjects />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
