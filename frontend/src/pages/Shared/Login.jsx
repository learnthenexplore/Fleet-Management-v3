 import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { useState } from 'react';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!employeeId.trim()) {
      alert('Please enter Employee ID');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/employee/login', { employeeId });

      const user = res.data.user;
      dispatch(setUser(user));
    } catch (err) {
      console.error('Login failed:', err);
      alert(err?.response?.data?.error || 'Login failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <label className="block mb-2 text-sm font-medium">Employee ID</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
