import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import PasswordInput from '../../components/PasswordInput';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-offwhite flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-light text-primary mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-subtlegray">
          Join us by creating your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary py-10 px-6 shadow-sm rounded-lg sm:px-10">
          {error && (
            <div className="mb-6 border-l-4 border-primary p-4 bg-lightgray">
              <p className="text-sm text-darkgray">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-darkgray mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-darkgray mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-midgray rounded-md bg-secondary placeholder-subtlegray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 ease-in-out"
              />
            </div>

            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              label="Password"
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-8 pt-4 border-t border-lightgray">
            <p className="text-center text-sm text-subtlegray">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-darkgray transition duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;