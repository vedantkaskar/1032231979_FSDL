# Flight Booking System

Full-stack MERN application with:

- `client` - React frontend built with Vite
- `server` - Node.js, Express, MongoDB backend

## Features

- Add and list flights
- Create, update, and cancel bookings
- Auto-generated `bookingId`
- Seat selector with booked seats disabled
- Seat conflict prevention for the same flight and journey date
- Loading states and validation

## Backend Setup

1. Open a terminal in `Assign7/server`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using `.env.example`
4. Start MongoDB locally
5. Run the server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`

## Frontend Setup

1. Open a terminal in `Assign7/client`
2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`

## API Endpoints

### Flights

- `POST /api/flights` - Add flight
- `GET /api/flights` - Get all flights

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/:id` - Update seat/contact
- `DELETE /api/bookings/:id` - Cancel booking and free seat

## Notes

- Seat availability is checked for the same `flightId`, `journeyDate`, and `seatNumber`
- `DELETE` performs a cancellation by marking the booking as `Cancelled`
