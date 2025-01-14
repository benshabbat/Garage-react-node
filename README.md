# Garage Management System

A comprehensive garage management system that enables client management, vehicle tracking, user administration, and messaging. The system includes advanced authorization and authentication features.

## Technologies

### Frontend
- React.js (Vite-based)
- Redux Toolkit for state management
- Axios for API calls
- Context API for global state management
- Pure CSS for styling

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcrypt for password encryption

## Key Features

### Landing Page
- **About Section**: Information about the garage as a digital auto service partner
  - Professional service description
  - Digital platform advantages
  - Access to reports and team communication
  - Available services list
  - Contact CTA button
- **Contact Form**: Digital contact form for inquiries
- **Reviews**: Customer testimonials section
- Footer with developer credits

### Management System
- Role-based authorization (Admin/Regular User)
- User management (Add/Edit/Delete - Admin only)
- Vehicle management
- Message system
- Contact form handling
- Advanced security with JWT and bcrypt

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- MongoDB
- Vite (installed automatically with project dependencies)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/benshabbat/Garage-react-node
```

2. Install the required packages:

```bash
# Install client packages
cd client
npm install

# Install server packages
cd ../server
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory with the following parameters:
```
PORT=8800
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

4. Run the project:
```bash
# Start the server
cd server
npm start

# Start the client (in a separate terminal)
cd client
npm run dev
```

## Project Structure

```
project/
├── client/                  # Frontend code
│   ├── node_modules/       
│   ├── public/            
│   ├── src/
│   │   ├── app/           # App-wide configurations
│   │   ├── components/    # Reusable React components
│   │   ├── features/      # Feature-specific components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── icons/         # Icon assets
│   │   ├── images/        # Image assets
│   │   ├── pages/         # Page components
│   │   ├── validation/    # Form validation logic
│   │   ├── .env          # Environment variables
│   │   ├── App.jsx       # Root component
│   │   ├── axiosConfig.js # Axios configuration
│   │   ├── index.css     # Global styles
│   │   ├── main.jsx      # Entry point
│   │   └── utils.js      # Utility functions
│   └── package.json
└── server/                # Backend code
    ├── config/           # Configuration files
    ├── controllers/      # API controllers
    ├── middleware/       # Custom middleware
    ├── models/          # MongoDB models
    ├── routes/          # Route definitions
    ├── services/        # Business logic services
    ├── utils/           # Utility functions
    ├── .env            # Environment variables
    ├── .gitignore      # Git ignore file
    ├── .htaccess       # Apache configuration
    ├── index.js        # Server entry point
    ├── package.json    # Server dependencies
    └── package-lock.json

## System Usage

### Authentication/Authorization
- System requires registration and login
- New users can only be registered by admin
- Login is performed using email and password

### Vehicle Management
- Add new vehicles
- Edit vehicle details
- View service history
- Delete vehicles

### Customer Management
- Add new customers
- Edit customer details
- View customer history
- Delete customers

## Security
- All passwords encrypted using bcrypt
- User authentication via JWT
- Role-based access control
- Protection against XSS and CSRF
- CORS configured for specific origin:
```javascript
cors({
  origin: 'https://garage-client-one.vercel.app',
  credentials: true
})
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (Admin only)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/populate` - Get users by type (Admin only)
- `POST /api/users/create` - Create new user
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/users/:id` - Get specific user (Authenticated users)

### Cars
- `GET /api/cars` - Get all cars (Admin only)
- `GET /api/cars/service` - Get cars with service details (Authenticated users)
- `GET /api/cars/populate` - Get cars by type (Admin only)
- `GET /api/cars/user/:user` - Get cars by owner (Authenticated users)
- `POST /api/cars/:userId` - Create new car (Admin only)
- `PUT /api/cars/:id` - Update car details (Admin only)
- `DELETE /api/cars/:id/:userId` - Delete car (Admin only)
- `GET /api/cars/:id` - Get specific car details (Authenticated users)

### Services
- `GET /api/services` - Get all services (Admin only)
- `GET /api/services/populate` - Get services by type (Admin only)
- `GET /api/services/car/:car` - Get services by car (Authenticated users)
- `GET /api/services/user/:user` - Get services by user (Public)
- `POST /api/services/:carId` - Create new service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)
- `GET /api/services/:id` - Get specific service (Authenticated users)

### Messages
- `GET /api/messages` - Get all messages (Admin only)
- `GET /api/messages/populate` - Get messages by type (Admin only)
- `POST /api/messages/to/:to` - Send message to admin (Public)
- `POST /api/messages/:from/:to` - Send message between users
- `PUT /api/messages/:idMessage` - Update message (Authenticated users)
- `DELETE /api/messages/:id` - Delete message (Authenticated users)
- `GET /api/messages/:id` - Get specific message (Authenticated users)
- `GET /api/messages/user/:id` - Get user messages (Authenticated users)

### Reviews
- `GET /api/reviews` - Get all reviews (Public)
- `POST /api/reviews` - Create new review (Public)

### Appointments
- `GET /api/appointments` - Get all appointments (Admin only)
- `POST /api/appointments` - Create new appointment (Public)

### Contacts
- `GET /api/contacts` - Get all contact submissions (Admin only)
- `POST /api/contacts` - Submit contact form (Public)
- `DELETE /api/contacts/:id` - Delete contact submission (Admin only)

### Authorization Levels
The API uses different authorization levels:
- **Public**: No authentication required
- **Authenticated users** (`verifyUser`): Logged-in users can access their own data
- **Admin only** (`verifyAdmin`): Only administrators have access

### Authentication Methods
The system uses JWT (JSON Web Tokens) for authentication with three middleware functions:
- `verifyToken`: Validates the JWT token
- `verifyUser`: Ensures the user has access to their own resources
- `verifyAdmin`: Restricts access to admin users only

## Contributing
We welcome contributions! Please:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or support, please:
- Use the contact form on the website
- Open an issue on GitHub

## Developer
Written by David-Chen Benshabbat