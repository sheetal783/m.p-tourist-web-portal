# Troubleshooting Guide - "Failed to load destinations" Error

## Common Causes and Solutions

### 1. Backend Server Not Running

**Symptom:** Error message "Failed to load destinations" or "Cannot connect to backend server"

**Solution:**
1. Open a terminal/PowerShell window
2. Navigate to the backend folder: `cd backend`
3. Start the server: `npm run dev`
4. You should see: "Server running on port 5000" and "MongoDB Connected"

### 2. MongoDB Not Running

**Symptom:** Backend server crashes or shows MongoDB connection errors

**Solution:**
1. Ensure MongoDB is installed and running
2. Check if MongoDB service is running: `mongod --version`
3. Start MongoDB if needed (usually starts automatically on Windows)
4. Verify MongoDB is listening on port 27017

### 3. Wrong API URL Configuration

**Symptom:** API requests going to wrong URL

**Solution:**
1. Check `frontend/.env` file exists
2. Ensure it contains: `VITE_API_URL=http://localhost:5000/api`
3. If `.env` file doesn't exist, create it with the above content
4. **Restart the frontend server** after changing `.env` file

### 4. CORS Issues

**Symptom:** Browser console shows CORS errors

**Solution:**
- The backend already has CORS enabled (`app.use(cors())`)
- If you still see CORS errors, check the backend `server.js` file
- Ensure `app.use(cors())` is before the routes

### 5. Port Conflicts

**Symptom:** Backend can't start on port 5000

**Solution:**
1. Check if port 5000 is already in use
2. Kill the process using port 5000: 
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
3. Or change the port in `backend/.env`: `PORT=5001`
4. Update `frontend/.env`: `VITE_API_URL=http://localhost:5001/api`

## Quick Diagnostic Steps

1. **Check Backend Status:**
   ```powershell
   # Check if port 5000 is listening
   Get-NetTCPConnection -LocalPort 5000
   
   # Test backend health
   Invoke-WebRequest -Uri http://localhost:5000/health
   ```

2. **Check API Endpoint:**
   ```powershell
   # Test destinations API
   Invoke-WebRequest -Uri http://localhost:5000/api/destinations
   ```

3. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

4. **Check Server Logs:**
   - Look at the backend PowerShell window
   - Check for any error messages
   - Verify MongoDB connection message

## Still Having Issues?

1. **Verify both servers are running:**
   - Backend: http://localhost:5000/health
   - Frontend: http://localhost:8080

2. **Check database is seeded:**
   ```bash
   cd backend
   npm run seed
   ```

3. **Clear browser cache and reload**

4. **Restart both servers:**
   - Stop both servers (Ctrl+C)
   - Start backend first: `cd backend && npm run dev`
   - Wait for "MongoDB Connected" message
   - Start frontend: `cd frontend && npm run dev`



