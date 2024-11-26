const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Example: GET route
app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
  });
  
  // Example: POST route
  app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // Simulate saving to a database
    res.status(201).json({ message: 'User added', user: newUser });
  });
  
  // Example: PUT route
  app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    res.json({ message: `User ${userId} updated`, updatedData });
  });
  
  // Example: DELETE route
  app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User ${userId} deleted` });
  });

  
  const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
  