import mongoose from 'mongoose';

const breakdownSchema = new mongoose.Schema({
  dailyLogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyLog',
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  description: String,
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  reportedBy: {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    shiftSupervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    shiftInchargeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    vehicleHandedOverTo: {
      type: String,
      required: true,
    },
  },
  mechanicAction: {
    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    acceptedAt: Date,
    startedAt: Date,
    resolvedAt: Date,
    resolutionDescription: String,
    workDone: String,
    resourcesUsed: [String],
    vehicleHandedOverTo: String,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Breakdown', breakdownSchema);
