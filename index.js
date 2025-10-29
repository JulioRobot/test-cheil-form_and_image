const express = require('express');
const app = express();
const PORT = 3000;

// Create a simple "Hello World" route
app.get('/', (req, res) => {
  res.send('<h1>Hello World! 🌍</h1><p>Welcome to your first web application!</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});