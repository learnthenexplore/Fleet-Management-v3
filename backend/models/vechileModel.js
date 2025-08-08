import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  gateNumber: {
    type: String,
    required: true,
    unique: true, // Mining-unique identifier
  },
  assetCode: {
    type: String, // Equipment or Asset Code
    required: true,
    unique: true,
  },
  vehicleType: {
    type: String,
    enum: [
      'EXCAVATOR',
      'SURFACE_MINER',
      'TIPPER',
      'DOZER',
      'GRADER',
      'SERVICE_VAN',
      'DIESEL_TANKER',
      'DG',
      'LMV'
    ],
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registrationValidTill: {
    type: Date,
  },
  pollutionValidTill: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'UNDER_MAINTENANCE', 'INACTIVE', 'ON_TRIP'],
    default: 'AVAILABLE',
  },
  department: {
    type: String,
    enum: ['MINING', 'TRANSPORT', 'MAINTENANCE', 'SUPPORT'],
  },
  remarks: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('Vehicle', vehicleSchema);
