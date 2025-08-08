# Learning Log

 
## Aug 1, 2025
- Multiple folder can be created using git bash :mkdir "controllers" "routes"
- To learn create delete file from git bash 
- How to setup index.js app.js socket.js
- Understand  the actual use of FleetMangment  software and its  use in businessess which helped me in designg my  database .
- it helped me to decide the entity and its attribut
- I decided to make trip and break down  as a seprate scheme instead of insearting it in form , i did that because it will make the   the query efficient , There is documunt size limitation in mongodb .
- Today i desgin the sclable schema for Trips and Breakdown , DailyLog,and in each trip and breakdown i am saving the DailyLog_id
- Every daily log has  entinty breakdown: true/false which will be helpful for the detecting which form has breakdown;
- Built the vehicle model in MongoDB.
- Understood difference between `PUT` vs `PATCH`.
backend/
├── config/
│   └── db.js                  # MongoDB/Mongoose connection
│   └── socketEvents.js        # Central socket event handlers (optional separation)
│
├── controllers/
│   ├── vehicleController.js
│   ├── driverController.js
│   ├── tripController.js
│   └── notificationController.js
│
├── models/
│   ├── Vehicle.js
│   ├── Driver.js
│   ├── Trip.js
│   └── Notification.js
│
├── routes/
│   ├── vehicleRoutes.js
│   ├── driverRoutes.js
│   ├── tripRoutes.js
│   └── notificationRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js      # JWT/token check
│   └── errorHandler.js
│
├── sockets/
│   └── index.js               # Initialize and export socket logic
│   └── notificationSocket.js  # Real-time logic for notifications
│
├── utils/
│   ├── sendPush.js            # For sending push or in-app notifications
│   └── logger.js              # Logging utility (e.g., Winston)
│
├── app.js                     # Express app setup (middleware + routes)
├── index.js                   # Entry point, starts HTTP server and socket
├── socket.js                  # Main socket.io initialization
├── .env
└── package.json


## Aug 2, 2025
-  Employe Schema
- 📄 Employee Schema – Key Design Points
1. Basic Details
name – Full name of the employee.

employeeId – Unique identifier for each employee.

email – (Optional) Contact email.

photo – URL or path to employee's photo.

2. Employee Type
Field: employeeType

Values:

'OPERATOR'

'EXECUTIVE'

'MANAGEMENT'

'MECHANIC'

'TIME_OFFICE'

💡 Used to group employees by functional role and apply logic (e.g., assign vehicles only to operators).

3. Assigned Vehicles (Only for Operators)
Field: assignedVehicles

Structure: Array of { vehicle, type }

type: 'PERMANENT' or 'TEMPORARY'

💡 Allows tracking which vehicle(s) an operator is assigned to.

4. Notification Preferences
Field: notificationPreferences.mutedTypes

Type: Array of event types the user has muted.

Values include:

'TRIP_STARTED', 'FUELING_UPDATED', 'BREAKDOWN_REPORTED', etc.

💡 Gives user-specific control over which notifications they receive.

5. Permissions
Field: permissions

Type: Array of permission strings.

Two categories:

View Access:
'MANAGEMENT_VIEW', 'OPERATOR_VIEW', 'MECHANIC_VIEW', 'EXECUTIVE_VIEW'

Executive Page Actions:
'ADD_EMPLOYEE', 'ASSIGN_VEHICLE', 'FILL_FUEL', 'ADD_VEHICLE', 'UPDATE_MEASUREMENT_UNIT'

💡 Used in frontend/backend to control access to pages or features.

6. Active Status
Field: active

Type: Boolean, default: true

💡 Use this to soft-delete or deactivate employees without removing their data from logs.

7. Timestamps
createdAt: Auto-generated when the employee is added.

✅ Purpose & Use
Feature	Used For
employeeType	Logic for vehicle assignment, UI personalization
assignedVehicles	Linking operators to machines
notificationPreferences	Letting users mute unwanted notifications
permissions	Controlling which user sees which UI options
active	Avoid deleting employee history; just deactivate
photo	Profile display in dashboard, logs, etc.

 
- Fuel Schema 
📄 Fuel Log Schema – Design Overview
The Fuel Log Schema is used to record all fuel transactions for vehicles, helping track fuel consumption, monitor fueling activities, and maintain data integrity with associated vehicle and employee information.

🔑 Key Fields and Their Purpose
Field	Type	Description
vehicle	ObjectId (ref: Vehicle)	The vehicle that was refueled. Required.
filledBy	ObjectId (ref: Employee)	The person who performed the fuel filling. Usually a fuel operator. Required.
filledFor	ObjectId (ref: Employee)	(Optional) The operator/driver who requested the fuel.
date	Date	The timestamp of the fuel transaction. Defaults to current time.
fuelType	String	Type of fuel used. Supported values: 'DIESEL', 'PETROL'.
quantity	Number	Amount of fuel filled. Measured in litres or gallons.
unit	String	Unit of fuel quantity. Defaults to 'LITRE'.
odoMeter	Number	(Optional) Odometer reading of the vehicle at the time of fueling.
HMR	Number	(Optional) Hour Meter Reading (used for mining/construction equipment).
fuelStation	String	(Optional) Fuel pump/station or location of fueling.
remarks	String	(Optional) Any additional notes for the log.
shift	String	(Optional) Shift during which fuel was filled. Values: 'A', 'B', 'C'.
attachment	String	(Optional) Path or URL to a fuel receipt or photo proof.
active	Boolean	Used to soft delete or deactivate incorrect or invalid logs. Default: true.
createdAt, updatedAt	Date	Auto-managed timestamps using { timestamps: true }.

 
- Notification Schema

📌 Notification Schema – Key Points
eventType

Represents the type of event that triggered the notification.

Examples: 'EMPLOYEE_ADDED', 'TRIP_STARTED', 'BREAKDOWN_REPORTED', etc.

Helps in identifying and filtering notifications.

title

A short, user-friendly title for the notification.

Example: "Breakdown Reported".

message

A descriptive message giving more details about the event.

This is what the user usually sees on the frontend.

recipients

An array of Employee IDs who should receive this notification.

Enables user-specific delivery instead of broadcasting to everyone.

Useful for targeted alerts like "vehicle assigned to a driver".

viewScopes

Defines which UI sections (views) should display the notification.

Examples: 'DRIVER_VIEW', 'MANAGEMENT_VIEW', 'MECHANIC_VIEW', 'EXECUTIVE_VIEW'.

Helps in frontend filtering and organizing notifications.

relatedModel

(Optional) The name of the model that the notification is related to.

For example: 'Trip', 'Breakdown', 'Vehicle'.

relatedId

(Optional) The specific _id of the document from the related model.

Helps in linking notifications to actions/pages (e.g., view breakdown details).

isReadBy

An array of user IDs who have already read this notification.

Used to show read/unread status and badge counts.

createdAt

Automatically stores the date and time when the notification was created.

Useful for sorting and filtering by time.

🔥 Why This Schema Works Well
Supports personalized delivery and visibility.

Enables view-specific filtering (management, mechanic, operator).

Tracks read/unread status per user.

Easily expandable with fields like priority or expiry.

Scales well across different types of notifications in your app.

## Aug 3, 2025
- Sunday

## Aug 4, 2025

- Written Code for index.js , App.js , Socket .js
- Later i have to  add jwt authentication for socket
- write db.js for db connection
- written controllers of addemployee
- setuped talwind css
- Using redux for  data storing , i made user slice 
- Making aside to render on basis of role
- Make the seklton of all page and have protected on the basis of role and given permission 

## Aug 5, 2025
- As redux is cleared on refresh so user is redirecting to to login so , make redux perestent or store user in local storage.

- Today i  congigured telemetric device FMB125 , and tested the flow of data by multiple method(sms , and used tracar server ,nork failed).
- Made TCP SERVER
- Studeid the HTPP VS TCP
- term AVL Packet need to study

