# SeconDrive

Your trusted partner for finding the perfect car. Explore and buy with confidence.

## About the Project

This is a concept website for used cars sales and purchase application, built with:
- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB

## Features

- User registration and authentication
- Listing of available cars
- Search filters by brand, model, year, etc.
- Publishing sale advertisements
- Contact between buyers and sellers

## Note

If, when you open the website, the loading is taking a while, it is likely because the backend is starting up. Sometimes, if the backend has been inactive for a certain period, it may take a couple of minutes to resume full operation due to the limitations of the free instance on Render.com.

## Project Setup

### Prerequisites
- Node.js 
- npm or other package manager
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/seconDrive.git
cd seconDrive
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Backend Configuration

1. Create a `.env` file in the backend folder with the following variables:
```
JWT_SECRET="random#secret"
MONGODB_URI="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/SeconDrive"
PORT=5000
```

2. Replace the MongoDB connection link in the `config/db.js` file:

You can directly replace the connection link in the file:
```javascript
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect(
            process.env.MONGODB_URI || "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/SeconDrive"
        )
        .then(() => {
            console.log("DB Connected");
        });
};
```

**Important:** For security reasons, it is recommended to use the `MONGODB_URI` environment variable in the `.env` file instead of inserting credentials directly into the code.

### Running the Project

1. Start the backend:
```bash
cd backend
node server.js
```

2. In another terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Access the project at: `http://localhost:5173`
