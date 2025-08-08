// ✅ File: src/routes/sidebarConfig.js

export const sidebarConfig = {
  OPERATOR: [
    { label: 'Active Forms', path: '/operator/active-forms' },
    { label: 'Start New Form', path: '/operator/new-form' },
  ],

  TIME_OFFICE: [
    { label: 'Assign Vehicle', path: '/time-office/assign-vehicle' },
    { label: 'See Vehicle', path: '/time-office/vehicles' },
  ],

  MECHANIC: [
    { label: 'Breakdown Vehicles', path: '/mechanic/breakdowns' },
    { label: 'Accepted Breakdowns', path: '/mechanic/accepted' },
  ],

  MANAGEMENT: [
    { label: 'Live Trips', path: '/management/live-trips' },
    { label: 'Filter Trips', path: '/management/trips' },
    { label: 'Filter Vehicles', path: '/management/vehicles' },
    { label: 'Update Measurement Unit', path: '/management/update-measurement' },
    { label: 'Analyze Idle Time', path: '/management/idle-analysis' },
  ],

  EXECUTIVE: [
    { label: 'Add Employee', path: '/executive/add-employee', permission: 'ADD_EMPLOYEE' },
    { label: 'Fill Fuel', path: '/executive/fill-fuel', permission: 'FILL_FUEL' },
    { label: 'Add Vehicle', path: '/executive/add-vehicle', permission: 'ADD_VEHICLE' },
    { label: 'Update Measurement Unit', path: '/executive/update-measurement', permission: 'UPDATE_MEASUREMENT_UNIT' },
    { label: 'See Breakdowns', path: '/executive/breakdowns', permission: 'EXECUTIVE_VIEW' },
    { label: 'See Vehicles', path: '/executive/vehicles', permission: 'EXECUTIVE_VIEW' },
  ]
};