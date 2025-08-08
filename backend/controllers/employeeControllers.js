import Employee from '../models/employeeModel.js';

/**
 * @desc Add a new employee
 * @route POST /api/employees
 */
export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      employeeId,
      email,
      photo,
      employeeType,
      notificationPreferences,
      permissions
    } = req.body;
   console.log('Adding employee:',req.body);
    // Check for existing employeeId
    const existing = await Employee.findOne({ employeeId });
    if (existing) {
      return res.status(409).json({ error: 'Employee ID already exists' });
    }

    const newEmployee = new Employee({
      name,
      employeeId,
      email,
      photo,
      employeeType,
      notificationPreferences,
      permissions,
    });

    await newEmployee.save();

    res.status(201).json({
      message: '✅ Employee added successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('❌ Error adding employee:', error.message);
    res.status(500).json({ error: 'Failed to add employee' });
  }
};

// controllers/authController.js
 

export const loginByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    const employee = await Employee.findOne({ employeeId });

    if (!employee || !employee.active) {
      return res.status(404).json({ error: 'Employee not found or inactive' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: employee._id,
        name: employee.name,
        employeeId: employee.employeeId,
        employeeType: employee.employeeType,
        permissions: employee.permissions,
        photo: employee.photo,
        email: employee.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
};
