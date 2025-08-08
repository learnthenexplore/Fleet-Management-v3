import mongoose from 'mongoose';

const assignedVehicleSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  type: {
    type: String,
    enum: ['PERMANENT', 'TEMPORARY'],
    required: true,
  },
}, { _id: false });

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
  },
  photo: {
    type: String, // Can be a URL or path to uploaded photo
  },

  employeeType: {
    type: String,
    enum: ['OPERATOR', 'EXECUTIVE', 'MANAGEMENT', 'MECHANIC', 'TIME_OFFICE'],
    required: true,
  },

  assignedVehicles: {
    type: [assignedVehicleSchema],
    default: [],
  },

  notificationPreferences: {
    mutedTypes: [
      {
        type: String,
        enum: [
          'EMPLOYEE_ADDED',
          'VEHICLE_ASSIGNED',
          'TRIP_STARTED',
          'BREAKDOWN_REPORTED',
          'BREAKDOWN_ACCEPTED',
          'BREAKDOWN_RESOLVED',
          'PRODUCTION_UPDATED',
          'FUELING_UPDATED',
        ],
      }
    ],
  },

permissions: [
  {
    type: String,
    enum: [
      // View Roles
      'MANAGEMENT_VIEW',
      'OPERATOR_VIEW',
      'MECHANIC_VIEW',
      'EXECUTIVE_VIEW',

      // Executive-specific actions
      'ADD_EMPLOYEE',
      'ASSIGN_VEHICLE',
      'FILL_FUEL',
      'ADD_VEHICLE',
      'UPDATE_MEASUREMENT_UNIT',
    ],
  }
],


  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Employee', employeeSchema);
