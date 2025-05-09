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
import EditProject from './pages/projects/EditProject';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/create-project" element={
                <PrivateRoute>
                  <CreateProject />
                </PrivateRoute>
              } />
              
              <Route path="/my-projects" element={
                <PrivateRoute>
                  <MyProjects />
                </PrivateRoute>
              } />

<Route path="/projects/:id/edit" element={
  <PrivateRoute>
    <EditProject />
  </PrivateRoute>
} />
              
              <Route path="/my-purchases" element={
                <PrivateRoute>
                  <MyPurchases />
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              
              <Route path="/admin" element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              
              <Route path="/approve-projects" element={
                <PrivateRoute adminOnly>
                  <ApproveProjects />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;