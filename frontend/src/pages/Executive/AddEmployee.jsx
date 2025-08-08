import React, { useState } from 'react';
import axios from 'axios';

const EMPLOYEE_TYPES = [
  'OPERATOR',
  'EXECUTIVE',
  'MANAGEMENT',
  'MECHANIC',
  'TIME_OFFICE',
];

const PERMISSION_OPTIONS = [
  'OPERATOR_VIEW',
  'EXECUTIVE_VIEW',
  'MANAGEMENT_VIEW',
  'MECHANIC_VIEW',
  'ADD_EMPLOYEE',
  'ASSIGN_VEHICLE',
  'FILL_FUEL',
  'ADD_VEHICLE',
  'UPDATE_MEASUREMENT_UNIT',
];

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    photo: '',
    employeeType: '',
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
 
  try {
    const response = await axios.post('http://localhost:5000/api/employee/addemployee', formData);
    console.log('Success:', response.data);
    alert('Employee added successfully!');
    // Optionally reset form
    setFormData({
      name: '',
      employeeId: '',
      email: '',
      photo: '',
      employeeType: '',
      permissions: [],
    });
  } catch (error) {
    console.error('Error adding employee:', error.response?.data || error.message);
    alert('Failed to add employee');
  }
};

  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Employee ID</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Photo URL</label>
          <input
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Employee Type</label>
          <select
            name="employeeType"
            value={formData.employeeType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select type</option>
            {EMPLOYEE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Permissions Allowed</label>
          <div className="grid grid-cols-2 gap-2">
            {PERMISSION_OPTIONS.map((perm) => (
              <label key={perm} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(perm)}
                  onChange={() => handlePermissionToggle(perm)}
                />
                <span className="text-sm">{perm}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
