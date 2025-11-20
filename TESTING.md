# Testing Guide for TourEase Signup

## Prerequisites

1. **MongoDB**: Make sure MongoDB is installed and running
   - If using local MongoDB: `mongod` should be running
   - Default connection: `mongodb://localhost:27017/tourease`
   - Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`

2. **Node.js**: Ensure Node.js is installed (v14 or higher)

## Setup Steps

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tourease
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server should start on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend should start on `http://localhost:5173`

## Testing the Signup Functionality

### Manual Testing

1. Open your browser and navigate to `http://localhost:5173/signup`

2. Fill out the signup form:
   - **Name**: Enter your full name (minimum 2 characters)
   - **Email**: Enter a valid email address
   - **Phone**: (Optional) Enter a phone number
   - **Password**: Enter a password (minimum 6 characters)
   - **Confirm Password**: Re-enter the same password

3. Click "Create Account"

4. **Expected Results**:
   - If successful: You should see a green success message and be redirected to the home page after 2 seconds
   - If there's an error: You'll see a red error message with details

### Test Cases

#### Valid Signup
- Name: "John Doe"
- Email: "john@example.com"
- Password: "password123"
- Confirm Password: "password123"
- **Expected**: Success message, token stored in localStorage, redirect to home

#### Invalid Email
- Email: "invalid-email"
- **Expected**: Error message "Please enter a valid email"

#### Password Mismatch
- Password: "password123"
- Confirm Password: "password456"
- **Expected**: Error message "Passwords do not match"

#### Duplicate Email
- Try to sign up with the same email twice
- **Expected**: Error message "User already exists with this email"

#### Short Password
- Password: "12345" (less than 6 characters)
- **Expected**: Error message "Password must be at least 6 characters"

### API Testing (using curl or Postman)

#### Test Signup Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "+1234567890"
  }'
```

#### Expected Response (Success):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890"
    },
    "token": "..."
  }
}
```

#### Test Health Check
```bash
curl http://localhost:5000/api/health
```

## Verification Checklist

- [ ] Backend server starts without errors
- [ ] MongoDB connection is established (check console logs)
- [ ] Frontend server starts without errors
- [ ] Signup page loads correctly
- [ ] Form validation works (shows errors for invalid inputs)
- [ ] Successful signup creates user in MongoDB
- [ ] Token is stored in localStorage after successful signup
- [ ] Redirect to home page works after signup
- [ ] Duplicate email signup shows appropriate error
- [ ] Password visibility toggle works
- [ ] All form fields are properly styled and functional

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file
- Check MongoDB logs for errors

### CORS Error
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that backend CORS middleware is configured correctly

### Port Already in Use
- Change `PORT` in backend `.env` file
- Or kill the process using the port

### Frontend Can't Connect to Backend
- Verify backend is running on the correct port
- Check `VITE_API_URL` in frontend (or ensure it defaults to `http://localhost:5000/api`)
- Check browser console for network errors

