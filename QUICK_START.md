# Quick Start Guide - Fix "Cannot Connect to Backend Server"

## Step 1: Start Backend Server

### Option A: Using PowerShell (Recommended)
1. Open PowerShell
2. Navigate to backend folder:
   ```powershell
   cd C:\Users\gourh\OneDrive\Desktop\m.p-tourist-web-portal\backend
   ```
3. Start the server:
   ```powershell
   npm run dev
   ```

### Option B: Using the Batch File
1. Double-click `backend/start-server.bat`
2. This will install dependencies if needed and start the server

## Step 2: Verify Backend is Running

You should see in the terminal:
```
MongoDB Connected: localhost
Server running on port 5000
```

## Step 3: Test the Backend

Open in your browser:
```
http://localhost:5000/health
```

You should see:
```json
{"status":"OK","message":"Server is running"}
```

## Step 4: Test the API

Open in your browser:
```
http://localhost:5000/api/destinations
```

You should see JSON with 14 destinations.

## Step 5: Refresh Frontend

1. Go to: http://localhost:8080
2. Press F5 or Ctrl+R to refresh
3. Destinations should now load!

## Common Issues

### Issue: "Cannot find module '@google/generative-ai'"
**Solution:**
```powershell
cd backend
npm install
```

### Issue: "MongoDB connection error"
**Solution:**
- Ensure MongoDB is running
- Check if port 27017 is listening
- The server will exit if MongoDB can't connect

### Issue: Port 5000 already in use
**Solution:**
1. Find the process: `netstat -ano | findstr :5000`
2. Kill it: `taskkill /PID <PID> /F`
3. Or change port in `backend/.env`: `PORT=5001`

### Issue: Server starts but immediately crashes
**Solution:**
1. Check the error message in the terminal
2. Usually it's a missing dependency: `npm install` in backend folder
3. Or MongoDB not running

## Still Not Working?

1. Check the backend terminal window for error messages
2. Verify MongoDB is running: `mongod --version`
3. Make sure you're in the correct directory
4. Try installing dependencies again: `npm install` in backend folder



