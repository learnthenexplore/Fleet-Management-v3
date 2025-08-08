import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Or 'Driver' if using a separate model
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checklist: {
    type: Map,
    of: String, // index: 'OK' | 'Not OK'
  },
  otherIssues: String,
  issueReported: String, // "yes" | "no"
  mechanicId: String,
  driverId: String,
  shift: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
  workGroup: {
    type: String,
    enum: ['WG1', 'WG2', 'WG3'],
    required: true,
  },
  startHMR: {
    type: Number,
  },
  closeHMR: {
    type: Number,
  },
  startKM: {
    type: Number,
  },
  closeKM: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('DailyLog', dailyLogSchema);
