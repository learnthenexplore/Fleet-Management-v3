import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  dailyLogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyLog',
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: String,
  status: {
    type: String,
    enum: ['running', 'completed'],
    default: 'running',
  },
  materialType: {
    type: String,
    enum: ['coal', 'ob'],
    required: true,
  },
  materialMeasurement: {
    type: Number,
    required: true,
  },
  site: String,
  path: [
    {
      lat: Number,
      lon: Number,
      timestamp: Date,
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Trip', tripSchema);
