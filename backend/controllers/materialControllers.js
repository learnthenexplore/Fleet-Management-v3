// models/MaterialMeasurement.js
import mongoose from 'mongoose';

const materialMeasurementSchema = new mongoose.Schema({
  materialType: {
    type: String,
    enum: ['coal', 'ob'],
    required: true,
    unique: true, // only one entry per material
  },
  standardQuantity: {
    type: Number, // e.g., 30 or 14
    required: true,
  },
  unit: {
    type: String,
    enum: ['MT', 'm3'],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MaterialMeasurement', materialMeasurementSchema);
