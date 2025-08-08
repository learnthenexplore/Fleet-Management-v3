import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: [
      'EMPLOYEE_ADDED',
      'VEHICLE_ASSIGNED',
      'TRIP_STARTED',
      'BREAKDOWN_REPORTED',
      'BREAKDOWN_ACCEPTED',
      'BREAKDOWN_RESOLVED',
      'PRODUCTION_UPDATED',
      'FUELING_UPDATED'
    ],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  viewScopes: [
    {
      type: String,
      enum: ['DRIVER_VIEW', 'MANAGEMENT_VIEW', 'MECHANIC_VIEW', 'EXECUTIVE_VIEW', 'FUEL_VIEW', 'PRODUCTION_VIEW'],
    }
  ],

  relatedModel: {
    type: String, // e.g., 'Trip', 'Breakdown', 'Vehicle'
  },

  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  isReadBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Notification', notificationSchema);
