# Backend

## Model Schema
1. employeeModel 
2. vechileModel
3. e_vAssignmentModel
4. dailyLogModel
5. tripModel
6. breakDownModel
7. fuelLogModel
8. measurmentModel
9. notificaitonModel

## 1.  employeeModel
 
```js

import mongoose from 'mongoose';

const assignedVehicleSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  type: {
    type: String,
    enum: ['PERMANENT', 'TEMPORARY'],
    required: true,
  },
}, { _id: false });

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
  },
  photo: {
    type: String, // Can be a URL or path to uploaded photo
  },

  employeeType: {
    type: String,
    enum: ['OPERATOR', 'EXECUTIVE', 'MANAGEMENT', 'MECHANIC', 'TIME_OFFICE'],
    required: true,
  },

  assignedVehicles: {
    type: [assignedVehicleSchema],
    default: [],
  },

  notificationPreferences: {
    mutedTypes: [
      {
        type: String,
        enum: [
          'EMPLOYEE_ADDED',
          'VEHICLE_ASSIGNED',
          'TRIP_STARTED',
          'BREAKDOWN_REPORTED',
          'BREAKDOWN_ACCEPTED',
          'BREAKDOWN_RESOLVED',
          'PRODUCTION_UPDATED',
          'FUELING_UPDATED',
        ],
      }
    ],
  },

permissions: [
  {
    type: String,
    enum: [
      // View Roles
      'MANAGEMENT_VIEW',
      'OPERATOR_VIEW',
      'MECHANIC_VIEW',
      'EXECUTIVE_VIEW',

      // Executive-specific actions
      'ADD_EMPLOYEE',
      'ASSIGN_VEHICLE',
      'FILL_FUEL',
      'ADD_VEHICLE',
      'UPDATE_MEASUREMENT_UNIT',
    ],
  }
],


  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Employee', employeeSchema);

```
# 👨‍💼 Employee Schema

This schema defines the structure for storing **employee details** in the fleet management system.  
It supports multiple employee types, vehicle assignments, notification preferences, and access permissions.

---

## 🔑 Key Fields & Descriptions

### 1. **Basic Info**
- `name` *(String, required)*  
  Full name of the employee.

- `employeeId` *(String, required, unique)*  
  Unique ID issued to the employee.

- `email` *(String, optional)*  
  Employee’s email address (stored in lowercase).

- `photo` *(String)*  
  Path or URL to the employee's profile photo.

---

### 2. **Employee Role**
- `employeeType` *(String, required)*  
  Category of the employee, one of:
  - `OPERATOR`
  - `EXECUTIVE`
  - `MANAGEMENT`
  - `MECHANIC`
  - `TIME_OFFICE`

---

### 3. **Assigned Vehicles**
- `assignedVehicles` *(Array of subdocuments)*  
  Vehicles assigned to the employee. Each includes:
  - `vehicle`: ObjectId reference to a `Vehicle`  
  - `type`: `PERMANENT` or `TEMPORARY`

---

### 4. **Notification Preferences**
- `notificationPreferences.mutedTypes` *(Array of Strings)*  
  Types of notifications the user has muted. Can include:
  - `EMPLOYEE_ADDED`
  - `VEHICLE_ASSIGNED`
  - `TRIP_STARTED`
  - `BREAKDOWN_REPORTED`
  - `BREAKDOWN_ACCEPTED`
  - `BREAKDOWN_RESOLVED`
  - `PRODUCTION_UPDATED`
  - `FUELING_UPDATED`

---

### 5. **System Permissions**
- `permissions` *(Array of Strings)*  
  Determines the views and actions the user has access to.

  **Views:**
  - `MANAGEMENT_VIEW`
  - `OPERATOR_VIEW`
  - `MECHANIC_VIEW`
  - `EXECUTIVE_VIEW`

  **Executive Actions:**
  - `ADD_EMPLOYEE`
  - `ASSIGN_VEHICLE`
  - `FILL_FUEL`
  - `ADD_VEHICLE`
  - `UPDATE_MEASUREMENT_UNIT`

---

### 6. **Account Status**
- `active` *(Boolean, default: true)*  
  Marks whether the employee is currently active in the system.

---

### 7. **Timestamps**
- `createdAt` *(Date)*  
  Automatically set to the creation time of the employee document.

---
 

## 2. vechileModel

```js
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

```
# 🚚 Vehicle Schema

This schema defines the structure for storing information about vehicles in the fleet.  
It captures essential identification, classification, compliance, and operational status details for each equipment or vehicle used in the mining and transport environment.

---

## 🔑 Key Fields & Descriptions

### 1. **Identification Fields**

- `gateNumber` *(String, required, unique)*  
  Unique gate number assigned to the vehicle by mining operations.

- `assetCode` *(String, required, unique)*  
  Internal asset or equipment code used for internal tracking and finance.

- `registrationNumber` *(String, required, unique)*  
  Government-issued vehicle registration number (e.g., `MH12AB1234`).

---

### 2. **Vehicle Classification**

- `vehicleType` *(String, required)*  
  Type/category of the vehicle. Must be one of:
  - `EXCAVATOR`
  - `SURFACE_MINER`
  - `TIPPER`
  - `DOZER`
  - `GRADER`
  - `SERVICE_VAN`
  - `DIESEL_TANKER`
  - `DG` (Diesel Generator)
  - `LMV` (Light Motor Vehicle)

- `department` *(String, optional)*  
  Operational department responsible for the vehicle:
  - `MINING`
  - `TRANSPORT`
  - `MAINTENANCE`
  - `SUPPORT`

---

### 3. **Compliance Fields**

- `registrationValidTill` *(Date, optional)*  
  Expiration date of the vehicle's registration document.

- `pollutionValidTill` *(Date, optional)*  
  Expiration date of the Pollution Under Control (PUC) certificate.

---

### 4. **Operational Status**

- `status` *(String, default: `AVAILABLE`)*  
  Real-time status of the vehicle. One of:
  - `AVAILABLE`
  - `UNDER_MAINTENANCE`
  - `INACTIVE`
  - `ON_TRIP`

- `remarks` *(String, optional)*  
  Free-form notes or comments about the vehicle (e.g., issues, pending documents).

- `active` *(Boolean, default: `true`)*  
  Indicates whether the vehicle is currently part of the active fleet.

---

### 5. **Timestamps**

- `createdAt` *(Date)*  
  Automatically set when the vehicle record is created.

- `updatedAt` *(Date)*  
  Automatically updated when the record is modified.

---

 


## 3. e_vAssignmentModel

```js
import mongoose from 'mongoose';

const e_vAssignmentSchema = new mongoose.Schema({
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

```
# 🔄 Employee-Vehicle Assignment Schema

This schema tracks the history of vehicle assignments to employees (usually drivers or operators).  
It ensures that all assignments — both permanent and temporary — are recorded for accountability, shift management, and reporting.

---

## 🔑 Key Fields & Descriptions

### 1. **Core References**

- `employee` *(ObjectId, required)*  
  Reference to the **employee** who is being assigned a vehicle.  
  Points to the `Employee` model.

- `vehicle` *(ObjectId, required)*  
  Reference to the **vehicle** being assigned.  
  Points to the `Vehicle` model.

- `assignedBy` *(ObjectId, required)*  
  Reference to the **user/admin** who made the assignment.  
  Typically a supervisor, manager, or time-office staff.  
  Also points to the `Employee` model.

---

### 2. **Assignment Details**

- `assignmentType` *(String, required)*  
  Type of assignment:
  - `PERMANENT`
  - `TEMPORARY`

- `assignedDate` *(Date, default: current date)*  
  Timestamp when the assignment was made.  
  Defaults to the creation date.

- `unassignedDate` *(Date, optional)*  
  Date when the assignment ended or was deactivated.  
  Used for tracking historical changes.

- `remarks` *(String, optional)*  
  Free-form comments or notes about the assignment.

---

### 3. **Status Tracking**

- `active` *(Boolean, default: true)*  
  Marks whether the assignment is currently valid/ongoing.  
  Useful for querying current assignments or filtering past ones.

---

### 4. **Timestamps**

- `createdAt` *(Date)*  
  Automatically added by Mongoose when the record is created.

- `updatedAt` *(Date)*  
  Automatically updated when the record is modified.

---

 
## 4. dailyLogModel

```js
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

```
# 📘 Daily Log Schema

This schema tracks the **daily usage and condition** of a vehicle assigned to a driver, including basic operational metrics and inspection checklist results.  
It is designed to record per-shift logs for each vehicle-driver combination.

---

## 🔑 Key Fields & Descriptions

### 1. **Core References**

- `driver` *(ObjectId, required)*  
  Reference to the employee (typically a driver) who is operating the vehicle.  
  Refers to the `Employee` model.

- `vehicle` *(ObjectId, required)*  
  Reference to the vehicle used in the log entry.  
  Refers to the `Vehicle` model.

- `date` *(Date, required)*  
  The date of the log entry. This is usually the day of operation.

---

### 2. **Shift & Group Info**

- `shift` *(String, required)*  
  Shift in which the vehicle was operated. One of:
  - `A`
  - `B`
  - `C`

- `workGroup` *(String, required)*  
  Group working that shift, usually rotating weekly. One of:
  - `WG1`
  - `WG2`
  - `WG3`

---

### 3. **Checklists & Issues**

- `checklist` *(Map<String, String>)*  
  Pre-operation vehicle inspection data.  
  Each checklist item is stored as a key-value pair like `"Brakes": "OK"` or `"Horn": "Not OK"`.

- `otherIssues` *(String, optional)*  
  Free-text input for any issues not covered in the checklist.

- `issueReported` *(String, optional)*  
  Whether any issue was reported (`"yes"` or `"no"`).

- `mechanicId` *(String, optional)*  
  ID of the mechanic assigned (optional, may be string or converted to ObjectId).

- `driverId` *(String, optional)*  
  Optional field to redundantly store driver’s ID (can be used for cross-checks or flat exports).

---

### 4. **Operational Data**

- `startHMR` *(Number, optional)*  
  Hour Meter Reading at the start of the shift.

- `closeHMR` *(Number, optional)*  
  Hour Meter Reading at the end of the shift.

- `startKM` *(Number, optional)*  
  Kilometers recorded at the start of the shift.

- `closeKM` *(Number, optional)*  
  Kilometers recorded at the end of the shift.

---

### 5. **Status**

- `active` *(Boolean, default: true)*  
  Used to soft-delete or deactivate the log without removing it from the database.

---

 

## 5. tripModel
```js
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

```

# 🚛 Trip Schema

This schema records each **individual trip** taken by a vehicle, typically a tipper, within a mining operation.  
It is tightly linked with the `DailyLog`, and it captures information such as material type, assigned machine, GPS path, and status.

---

## 🔑 Key Fields & Descriptions

### 1. **Core References**

- `dailyLogId` *(ObjectId, required)*  
  Reference to the associated `DailyLog` record for the same shift.

- `vehicle` *(ObjectId, required)*  
  The vehicle used for the trip. Refers to the `Vehicle` model.

- `machine` *(ObjectId, required)*  
  The machine involved in loading the material (e.g., excavator or surface miner). Refers to the `Machine` model.

- `driverId` *(ObjectId, required)*  
  Employee (driver) who operated the vehicle during this trip. Refers to the `Employee` model.

---

### 2. **Timing & Status**

- `startTime` *(String, required)*  
  Time when the trip began. Can be in `HH:mm` or `ISO` format depending on use.

- `endTime` *(String, optional)*  
  Time when the trip ended (set when trip is completed).

- `status` *(String, default: `running`)*  
  Represents the state of the trip:
  - `running`: Trip is in progress.
  - `completed`: Trip has ended.

---

### 3. **Material Details**

- `materialType` *(String, required)*  
  The type of material being carried:
  - `coal`
  - `ob` (Overburden)

- `materialMeasurement` *(Number, required)*  
  The quantity of material carried, determined based on current active measurement settings (e.g., 30 MT per trip).

---

### 4. **Location Tracking**

- `site` *(String, optional)*  
  Site or block name where trip occurred.

- `path` *(Array of coordinates)*  
  Optional GPS trail for the trip. Each entry includes:
  - `lat` *(Number)*: Latitude
  - `lon` *(Number)*: Longitude
  - `timestamp` *(Date)*: When that point was recorded

---

### 5. **Metadata**

- `timestamp` *(Date, default: now)*  
  Auto-generated when the trip document is created.  
  Used to log when the trip was recorded in the system.

---

 

## 6. breakDownModel
```js
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

```
# 🛠️ Breakdown Schema

This schema captures and manages **vehicle breakdown reports**, their lifecycle, and resolution by mechanics.  
It is tightly integrated with shift logs and enables accountability, tracking, and reporting for maintenance incidents.

---

## 🔧 Key Fields & Descriptions

### 1. **References**

- `dailyLogId` *(ObjectId, required)*  
  Reference to the `DailyLog` during which the breakdown occurred.

- `vehicleId` *(ObjectId, required)*  
  The affected vehicle. Refers to the `Vehicle` model.

---

### 2. **Issue Details**

- `issue` *(String, required)*  
  Short title of the problem (e.g., "Engine Failure", "Brake Jam").

- `description` *(String, optional)*  
  Detailed description of the issue reported.

- `reportedAt` *(Date, default: now)*  
  Timestamp when the issue was reported.

---

### 3. **Reported By**

The `reportedBy` subdocument captures key responsible personnel at the time of the breakdown:

- `employeeId` *(ObjectId, required)*  
  The employee (usually operator) who reported the breakdown.

- `shiftSupervisorId` *(ObjectId, required)*  
  Supervisor during the shift.

- `shiftInchargeId` *(ObjectId, required)*  
  Incharge or lead authority for the shift.

- `vehicleHandedOverTo` *(String, required)*  
  Person or department to which the vehicle was handed over after breakdown.

---

### 4. **Mechanic Action**

The `mechanicAction` subdocument contains the full workflow of the breakdown resolution:

- `mechanicId` *(ObjectId)*  
  Mechanic assigned to resolve the issue.

- `acceptedAt` *(Date)*  
  Time when mechanic accepted the job.

- `startedAt` *(Date)*  
  Time when work began.

- `resolvedAt` *(Date)*  
  Time when the issue was resolved.

- `resolutionDescription` *(String)*  
  Summary of what was done to resolve the issue.

- `workDone` *(String)*  
  Specific actions or repairs performed.

- `resourcesUsed` *(Array of Strings)*  
  List of tools, parts, or resources used during repair.

- `vehicleHandedOverTo` *(String)*  
  Name of the person or department who received the vehicle post-repair.

---

### 5. **Resolution Status**

- `resolved` *(Boolean, default: false)*  
  Indicates whether the breakdown has been resolved.  
  Set to `true` once `resolvedAt` is filled.

---

 

## 7. fuelLogModel
```js
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

```
# ⛽ Fuel Log Schema

The `FuelLog` schema stores **fueling records** for vehicles, capturing who filled the fuel, for which vehicle and operator, how much was filled, and additional operational metadata.  
This helps track fuel usage per vehicle, employee, shift, and station.

---

## 🔑 Key Fields & Descriptions

### 1. **Entity References**

- `vehicle` *(ObjectId, required)*  
  Vehicle for which fuel is being logged. Refers to the `Vehicle` model.

- `filledBy` *(ObjectId, required)*  
  Employee who filled the fuel (usually time office, fuel boy, or executive). Refers to the `Employee` model.

- `filledFor` *(ObjectId, optional)*  
  Employee for whom fuel was filled (typically the operator or driver). Refers to the `Employee` model.

---

### 2. **Fueling Details**

- `date` *(Date, required, default: now)*  
  The date when the fuel was filled.

- `fuelType` *(String, required)*  
  Type of fuel:
  - `DIESEL`
  - `PETROL`

- `quantity` *(Number, required)*  
  The quantity of fuel filled.

- `unit` *(String, default: `LITRE`)*  
  Measurement unit:
  - `LITRE`
  - `GALLON`

---

### 3. **Operational Info**

- `odoMeter` *(Number, optional)*  
  Odometer reading at the time of fueling (for road-based vehicles).

- `HMR` *(Number, optional)*  
  Hour Meter Reading — used mainly for stationary or off-road equipment.

- `fuelStation` *(String, optional)*  
  Name or code of the station where fuel was filled.

- `remarks` *(String, optional)*  
  Free-form comments (e.g., tank not full, repeated refill, observed leak).

---

### 4. **Meta**

- `shift` *(String, optional)*  
  Shift during which the fueling was done:
  - `A`
  - `B`
  - `C`

- `attachment` *(String, optional)*  
  Path or URL to uploaded image/receipt (for records or audit).

- `active` *(Boolean, default: true)*  
  Marks whether the log is active (useful for soft-deletion).

- `createdAt`, `updatedAt` *(Timestamps)*  
  Automatically added by Mongoose.

---

 

## 8. measurmentModel
```js
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

```
# 🧮 Monthly Measurement Schema

The `Measurement` schema stores **monthly material measurement settings** used to calculate production quantities per trip.  
It maintains separate units and approximate values for both **coal** and **overburden (OB)**, which may change monthly.

---

## 🔑 Key Fields & Descriptions

### 1. **Month Identifier**

- `effectiveMonth` *(String, required, unique)*  
  Format: `'YYYY-MM'` (e.g., `'2025-08'`)  
  Defines the month for which the measurement values are effective.  
  Used to determine which values to apply during trip logging.

---

### 2. **Material Configurations**

Both `coal` and `ob` follow the same sub-schema:

#### materialSubSchema:
- `approxPerTrip` *(Number, required)*  
  Approximate quantity (in unit) transported in **one trip**.

- `unit` *(String, required)*  
  Unit of measurement:
  - `MT` = Metric Ton (for coal)
  - `BCM` = Bank Cubic Meter (for OB)

> 💡 This structure allows dynamic configuration for each month and material type.

---

### 3. **Metadata & Audit**

- `updatedBy` *(ObjectId, optional)*  
  Reference to the `Employee` who last updated the measurement.

- `remarks` *(String, optional)*  
  Notes or explanation for the change (e.g., change in equipment capacity or contractor agreement).

- `active` *(Boolean, default: true)*  
  Marks whether this measurement is currently active.  
  Only **one record per month** should be active for system calculations.

- `createdAt`, `updatedAt` *(Timestamps)*  
  Automatically managed by Mongoose.

---

 
## 9. notificaitonModel
```js
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

```

# 🔔 Notification Schema

The `Notification` schema stores in-app system messages triggered by various events like trip creation, breakdowns, fuel logs, or employee actions.  
It supports filtering by user roles, tracks read status, and links to related models for context.

---

## 🔑 Key Fields & Descriptions

### 1. **Core Event Info**

- `eventType` *(String, required)*  
  The event that triggered the notification. Must be one of:
  - `EMPLOYEE_ADDED`
  - `VEHICLE_ASSIGNED`
  - `TRIP_STARTED`
  - `BREAKDOWN_REPORTED`
  - `BREAKDOWN_ACCEPTED`
  - `BREAKDOWN_RESOLVED`
  - `PRODUCTION_UPDATED`
  - `FUELING_UPDATED`

- `title` *(String, required)*  
  Short heading or label for the notification (e.g., "New Trip Started").

- `message` *(String, required)*  
  Detailed message or description explaining the event.

---

### 2. **Audience Control**

- `viewScopes` *(Array of Strings)*  
  Specifies who can see the notification. Can include any of:
  - `DRIVER_VIEW`
  - `MANAGEMENT_VIEW`
  - `MECHANIC_VIEW`
  - `EXECUTIVE_VIEW`
  - `FUEL_VIEW`
  - `PRODUCTION_VIEW`

> 🔐 These scopes allow targeting notifications to specific roles.

---

### 3. **Model Linking**

- `relatedModel` *(String, optional)*  
  The model type the notification is related to (e.g., `'Trip'`, `'Breakdown'`, `'Vehicle'`).

- `relatedId` *(ObjectId, optional)*  
  The ID of the related model instance (used for navigation or reference).

---

### 4. **Read Tracking**

- `isReadBy` *(Array of ObjectIds)*  
  List of `Employee` IDs who have already read the notification.

---

### 5. **Timestamps**

- `createdAt` *(Date, default: now)*  
  Timestamp when the notification was created.

---

 