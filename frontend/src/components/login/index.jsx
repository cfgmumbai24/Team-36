// src/pages/loginpage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data.status === "success") {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          navigate('/dashboard');
        } else {
          console.log("Login failed:", result.data);
        }
      })
      .catch(err => {
        console.error("Error occurred during login:", err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input 
              type="text"
              placeholder='Enter email'
              name='email'
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input 
              type="password"
              placeholder='Enter Password'
              name='password'
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">Don't have an account?</p>
        <Link to='/register'>
          <button className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
