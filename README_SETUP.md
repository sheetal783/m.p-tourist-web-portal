# MP Tourism Portal - Setup Guide

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the backend directory:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/mp-tourism
   PORT=5000
   NODE_ENV=development
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Make sure MongoDB is running on your system**

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the frontend directory:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or the next available port)

## Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API"
4. Go to "Credentials" and create an API key
5. (Optional) Restrict the API key to your domain for security
6. Copy the API key and add it to both `.env` files

## Database Schema

The MongoDB schema for destinations includes:
- `name`: Destination name
- `slug`: URL-friendly identifier
- `category`: Category name
- `categoryId`: Category identifier (eco, heritage, tribal, nature)
- `image`: Image path
- `description`: Short description
- `fullDescription`: Detailed description
- `bestTime`: Best time to visit
- `duration`: Recommended visit duration
- `guidelines`: Array of eco/cultural guidelines
- `highlights`: Array of key highlights
- `location.lat`: Latitude
- `location.lng`: Longitude
- `location.address`: Full address

## API Endpoints

- `GET /api/destinations` - Get all destinations (optional query: `?category=eco`)
- `GET /api/destinations/:slug` - Get a single destination by slug

## Troubleshooting

1. **MongoDB connection errors**: Make sure MongoDB is running and the connection string in `.env` is correct
2. **Google Maps not loading**: Verify the API key is correct and the Maps JavaScript API is enabled
3. **CORS errors**: The backend is configured to allow requests from the frontend
4. **Port conflicts**: Change the PORT in backend `.env` or use a different frontend port






