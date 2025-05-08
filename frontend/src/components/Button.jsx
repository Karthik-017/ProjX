import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ${className}`}
  >
    {children}
  </button>
);

export default Button;

// This code defines a reusable button component in React.