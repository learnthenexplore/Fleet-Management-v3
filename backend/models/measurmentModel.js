import mongoose from 'mongoose';

const materialSubSchema = new mongoose.Schema({
  approxPerTrip: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['MT', 'BCM'],
    required: true,
  }
}, { _id: false });

const monthlyMeasurementSchema = new mongoose.Schema({
  effectiveMonth: {
    type: String, // Format: 'YYYY-MM'
    required: true,
    unique: true,
  },
  coal: materialSubSchema,
  ob: materialSubSchema,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
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

export default mongoose.model('Measurement', monthlyMeasurementSchema);
