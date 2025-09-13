// Simple test script to create test user and test login
const baseUrl = 'http://localhost:3000';

// Create test user
async function createTestUser() {
  try {
    const response = await fetch(`${baseUrl}/auth/create-test-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Create user response:', data);
    return data;
  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

// Test login
async function testLogin() {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'karma1@gmail.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    console.log('Login response:', data);
    return data;
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Creating test user...');
  await createTestUser();
  
  console.log('Testing login...');
  await testLogin();
}

runTests();