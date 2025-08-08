import mongoose from 'mongoose';

const e_vAssignmentSchema  = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true, // The driver
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
   assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Typically a supervisor, manager, or time office staff
    required: true,
  },
  assignmentType: {
    type: String,
    enum: ['PERMANENT', 'TEMPORARY'],
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  unassignedDate: {
    type: Date, // Set when unassigned
  },
  remarks: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('e_vAssignment', e_vAssignmentSchema);
