# Authentication Integration

This document describes the secure authentication system that connects the frontend to the backend.

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication with automatic refresh
- **Password Security**: Strong password requirements (8+ chars, uppercase, lowercase, number, special char)
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Client and server-side validation
- **Secure Storage**: JWT tokens stored in localStorage with automatic cleanup
- **CSRF Protection**: Cookies with httpOnly and secure flags
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 📁 File Structure

```
src/
├── services/
│   └── authService.js          # Main authentication service
├── contexts/
│   └── AuthContext.jsx         # React context for auth state
├── components/
│   └── ProtectedRoute.tsx      # Route protection component
├── pages/
│   ├── SignIn.tsx             # Updated login page
│   └── SignUp.tsx             # Updated registration page
└── utils/
    └── testConnection.js       # Backend connection tester
```

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd Airdrop_Journal_Backend
npm run dev
```

### 2. Start the Frontend
```bash
cd Airdrop_Journal_Frontend
npm run dev
```

### 3. Test the Connection
```bash
cd Airdrop_Journal_Frontend
node src/utils/testConnection.js
```

## 🔧 Configuration

### Environment Variables (.env)
```
VITE_API_BASE_URL=http://localhost:3001
VITE_NODE_ENV=development
VITE_DEBUG=true
```

### Backend Requirements
- Backend running on `http://localhost:3001`
- All authentication endpoints available:
  - `POST /api/auth/signup`
  - `POST /api/auth/login` 
  - `POST /api/auth/logout`
  - `GET /api/auth/me`

## 📋 API Integration

### Sign Up
```javascript
const result = await authService.signUp({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!'
});
```

### Sign In
```javascript
const result = await authService.signIn({
  email: 'john@example.com',
  password: 'SecurePass123!'
});
```

### Sign Out
```javascript
await authService.signOut();
```

### Get Current User
```javascript
const result = await authService.getCurrentUser();
```

## 🛡️ Security Best Practices Implemented

### 1. Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter  
- At least 1 number
- At least 1 special character (@$!%*?&)

### 2. Error Handling
- Network errors with user-friendly messages
- Validation errors with specific field feedback
- Rate limiting with appropriate timeouts
- Session expiration handling

### 3. Token Management
- Automatic token inclusion in requests
- Token refresh on authentication
- Automatic cleanup on logout/error
- Secure storage practices

### 4. Route Protection
- Protected routes require authentication
- Automatic redirection to login
- Auth routes redirect when logged in
- Loading states during auth checks

## 🎨 UI Components

### Sign Up Form
- First name and last name fields
- Email validation
- Password strength requirements
- Confirm password matching
- Real-time validation feedback
- Loading states
- Error messaging

### Sign In Form  
- Email validation
- Password requirements
- Remember me functionality
- Forgot password link
- Loading states
- Error messaging

### Sidebar Integration
- Display current user info
- User avatar or initials
- Logout functionality
- Loading state during logout

## 🚨 Removed Features

### Social Login (Google/Twitter)
- All social login buttons removed
- OAuth dependencies removed
- Simplified authentication flow
- Focus on email/password only

## 🔍 Testing

### Manual Testing Checklist
- [ ] Sign up with valid data
- [ ] Sign up with invalid data (error handling)
- [ ] Sign in with valid credentials
- [ ] Sign in with invalid credentials
- [ ] Access protected routes when logged out
- [ ] Access auth pages when logged in
- [ ] Logout functionality
- [ ] Token persistence across page refresh
- [ ] Password validation feedback
- [ ] Loading states work properly

### Automated Testing
```bash
# Test backend connection
node src/utils/testConnection.js

# Run frontend in development
npm run dev
```

## 🐛 Troubleshooting

### Backend Connection Issues
1. Ensure backend is running on port 3001
2. Check CORS configuration
3. Verify environment variables
4. Test with `curl http://localhost:3001/health`

### Authentication Errors
1. Check browser console for errors
2. Verify API endpoints are correct
3. Test with backend Swagger docs
4. Check network tab in dev tools

### Token Issues
1. Clear localStorage
2. Check token expiration
3. Verify JWT_SECRET in backend
4. Test token format in requests

## 📚 Additional Resources

- Backend API Documentation: `http://localhost:3002/api-docs`
- Frontend Development: `http://localhost:5173`
- Authentication Flow Diagram: See backend README
- Security Guidelines: See backend security documentation

## 🔄 Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (if needed)
- [ ] Remember me functionality
- [ ] Session management
- [ ] Activity logs
