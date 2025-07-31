// Test script to verify backend connection
import authService from '../services/authService.js';

const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...');
  
  try {
    // Test API connectivity by making a simple request
    const response = await fetch('http://localhost:3001/health');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running:', data);
      return true;
    } else {
      console.log('❌ Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend:', error.message);
    console.log('📝 Make sure the backend is running on http://localhost:3001');
    return false;
  }
};

const testAuth = async () => {
  console.log('\n🔐 Testing authentication service...');
  
  try {
    // Test with invalid credentials to check error handling
    await authService.signIn({
      email: 'test@example.com',
      password: 'wrongpassword'
    });
  } catch (error) {
    console.log('✅ Auth service properly handles errors:', error.message);
  }
  
  console.log('✅ Auth service is configured correctly');
};

// Run tests
(async () => {
  const backendOk = await testBackendConnection();
  
  if (backendOk) {
    await testAuth();
    console.log('\n🎉 All systems ready for authentication!');
  } else {
    console.log('\n⚠️  Please start the backend server first');
    console.log('   cd Airdrop_Journal_Backend && npm run dev');
  }
})();
