import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import PasswordInput from '../../components/PasswordInput';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
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
      await login(formData);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };



  return (
    <div className="min-h-screen bg-offwhite flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-light text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-subtlegray">
          Sign in to access your account
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-midgray rounded transition duration-200 ease-in-out"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-darkgray">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary hover:text-darkgray transition duration-200">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-secondary bg-primary hover:bg-darkgray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8 pt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lightgray"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-secondary text-sm text-subtlegray">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-center text-sm text-subtlegray">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-darkgray transition duration-200">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;