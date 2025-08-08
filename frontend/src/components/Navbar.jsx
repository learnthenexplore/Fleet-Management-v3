// src/components/Navbar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow">
      <h1 className="text-xl font-bold">Fleet Management</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, {user.name}</span>
         <button onClick={() => {
              dispatch(logoutUser());
                navigate('/login');
}}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
