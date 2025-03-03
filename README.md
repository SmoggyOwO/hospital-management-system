# Hospital Management System

A comprehensive Hospital Management System with REST APIs and a responsive frontend interface.

## Features

- CRUD operations for hospitals
- City-wise hospital listing with search/filter
- Speciality filtering
- Image upload functionality
- Detailed hospital view
- Form validation
- Loading states and error handling
- Success notifications

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB

### Frontend
- React.js
- React Router
- React Hook Form
- Tailwind CSS
- Axios
- React Hot Toast

## API Endpoints

- `POST /api/v1/hospitals/create` - Create new hospital
- `GET /api/v1/hospitals?city={cityName}` - Fetch hospitals by city
- `DELETE /api/v1/hospitals/delete?id={hospitalId}` - Remove hospital
- `PUT /api/v1/hospitals/update?id={hospitalId}` - Update hospital details
- `POST /api/v1/hospitals/details?id={hospitalId}` - Add/update hospital details
- `GET /api/v1/hospitals/details?id={hospitalId}` - Get hospital by ID

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev:all
   ```

## Project Structure

```
hospital-management-system/
├── server/                  # Backend code
│   ├── controllers/         # API controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── index.js             # Server entry point
├── src/                     # Frontend code
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
└── package.json             # Project dependencies
```

## License

MIT