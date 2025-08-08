import express from 'express';
import {
  addEmployee,
  loginByEmployeeId
} from '../controllers/employeeControllers.js';

const router = express.Router();

// POST /api/employee/addemployee
router.post('/addemployee', addEmployee);
router.post('/login', loginByEmployeeId);
 

export default router;
