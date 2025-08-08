# API Design

All APIs are prefixed with /api

## Vehicle APIs
- GET /api/vehicles → List all vehicles
- POST /api/vehicles → Add a new vehicle
- GET /api/vehicles/:id → Get vehicle details
- PUT /api/vehicles/:id → Update vehicle info
- DELETE /api/vehicles/:id → Remove vehicle

## Driver APIs
- GET /api/drivers
- POST /api/drivers
- GET /api/drivers/:id
- PUT /api/drivers/:id
- DELETE /api/drivers/:id

## Trip APIs
- POST /api/trips → Assign trip
- GET /api/trips → List all trips
- GET /api/trips?driver_id=X&date=Y → Filter by driver or date

## Auth APIs
- POST /api/login
- POST /api/register
