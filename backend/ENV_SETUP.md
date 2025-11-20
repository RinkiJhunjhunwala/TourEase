# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

## Required Environment Variables

```env
# MongoDB Connection
# For local MongoDB (default):
MONGODB_URI=mongodb://localhost:27017/tourease

# For MongoDB Atlas (cloud), use this format:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourease?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS - allows frontend to make requests)
FRONTEND_URL=http://localhost:5173

# JWT Secret Key (IMPORTANT: Change this to a random string!)
# Generate a secure random string using: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## How to Create the .env File

1. Navigate to the `backend` directory
2. Create a new file named `.env` (with the dot at the beginning)
3. Copy and paste the content above
4. Update the values as needed:
   - **MONGODB_URI**: 
     - If using local MongoDB: Keep as `mongodb://localhost:27017/tourease`
     - If using MongoDB Atlas: Replace with your connection string
   - **PORT**: Change if port 5000 is already in use
   - **FRONTEND_URL**: Change if your frontend runs on a different port
   - **JWT_SECRET**: **IMPORTANT** - Generate a secure random string for production

## Notes

- The `.env` file is already in `.gitignore`, so it won't be committed to git
- All variables have default values in the code, so the app will work without `.env`, but it's recommended to use one
- Never commit your `.env` file to version control
- In production, use a secure JWT_SECRET (at least 32 characters, random)

## Quick Setup

If you're using local MongoDB and default ports, you can create a minimal `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/tourease
JWT_SECRET=change-this-to-a-random-secret-key
```

The other variables will use their default values.

