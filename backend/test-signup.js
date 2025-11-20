/**
 * Simple test script to verify signup endpoint
 * Run: node test-signup.js
 * Make sure the server is running first: npm start
 */

const http = require('http');

const testData = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`, // Unique email
  password: 'test123',
  phone: '+1234567890',
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

console.log('Testing signup endpoint...');
console.log('Test data:', testData);

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\nResponse Status:', res.statusCode);
    console.log('Response Headers:', res.headers);
    
    try {
      const response = JSON.parse(data);
      console.log('\nResponse Body:');
      console.log(JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('\n✅ Test PASSED: Signup successful!');
      } else {
        console.log('\n❌ Test FAILED: Signup returned success: false');
      }
    } catch (e) {
      console.log('\nResponse (raw):', data);
      console.log('\n❌ Test FAILED: Could not parse response');
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ Test FAILED: Problem with request: ${e.message}`);
  console.log('Make sure the server is running on port 5000');
});

req.write(postData);
req.end();

