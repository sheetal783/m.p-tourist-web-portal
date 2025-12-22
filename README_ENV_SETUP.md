# Environment Variables Setup Guide

This guide explains all the environment variables needed for the MP Tourism Portal.

## Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/mp-tourism

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# Google Gemini AI API Key (for itinerary generation)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` folder:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Google Maps API Key (for interactive maps)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Getting API Keys

### 1. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key and add it to `frontend/.env` as `VITE_GOOGLE_MAPS_API_KEY`
6. (Optional) Restrict the API key to your domain for security

### 2. Google Gemini API Key (for AI Itinerary)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and add it to `backend/.env` as `GOOGLE_GEMINI_API_KEY`
5. Note: Gemini API has free tier limits, check pricing if needed

## Important Notes

- **Never commit `.env` files to Git** - They are already in `.gitignore`
- **Restart servers** after changing environment variables
- **Frontend variables** must start with `VITE_` to be accessible in the browser
- Keep your API keys secure and don't share them publicly

## Troubleshooting

### Frontend can't access environment variables
- Make sure variable names start with `VITE_`
- Restart the dev server after changing `.env`

### Backend API key errors
- Verify the API key is correct
- Check if the API is enabled in Google Cloud Console
- Ensure the API key has proper permissions

### Maps not loading
- Verify `VITE_GOOGLE_MAPS_API_KEY` is set correctly
- Check browser console for API errors
- Ensure "Maps JavaScript API" is enabled

### Itinerary generation fails
- Verify `GOOGLE_GEMINI_API_KEY` is set correctly
- Check backend logs for detailed error messages
- Ensure you have API quota available



