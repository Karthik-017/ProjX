// src/components/AuthForm.jsx
const AuthForm = ({ formType, formData, onChange, onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{formType === 'login' ? 'Login' : 'Register'}</h2>
  
        {formType === 'register' && (
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}
  
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {formType === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    );
  };
  
  export default AuthForm;
// This component is a reusable authentication form that can be used for both login and registration.  