import React from 'react';

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      className="w-full p-2 border border-gray-300 rounded"
      {...props}
    />
  </div>
);

export default Input;
// This code defines a reusable input component in React.