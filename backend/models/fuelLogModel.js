import mongoose from 'mongoose';

const fuelLogSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  filledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  filledFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Usually the driver/operator
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fuelType: {
    type: String,
    enum: ['DIESEL', 'PETROL'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['LITRE', 'GALLON'],
    default: 'LITRE',
  },
  odoMeter: {
    type: Number,
    required: false,
  },
  HMR: {
    type: Number,
    required: false,
  },
  fuelStation: {
    type: String,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  shift: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: false,
  },
  attachment: {
    type: String, // e.g., file URL or path to image of receipt
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('FuelLog', fuelLogSchema);
