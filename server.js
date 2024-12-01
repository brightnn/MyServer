const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const mysql = require('mysql2');

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mypassword',  // Ensure this password is correct
  database: 'bright_store'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// GET route to fetch all products
app.get('/products', function (req, res) {
  db.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    res.json(results);  // Send the array of products directly
  });
});

// POST route to add a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send({ error: true, message: 'Product name and price are required' });
  }

  const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(query, [name, price], (error, results) => {
    if (error) throw error;
    res.send({ error: false, data: results, message: 'Product added successfully' });
  });
});

// PUT route to update an existing product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send({ error: true, message: 'Product name and price are required' });
  }

  const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
  db.query(query, [name, price, id], (error, results) => {
    if (error) throw error;

    if (results.affectedRows === 0) {
      return res.status(404).send({ error: true, message: 'Product not found' });
    }

    res.send({ error: false, data: results, message: 'Product updated successfully' });
  });
});


// DELETE route to remove a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) throw error;

    if (results.affectedRows === 0) {
      return res.status(404).send({ error: true, message: 'Product not found' });
    }

    res.send({ error: false, data: results, message: 'Product deleted successfully' });
  });
});


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
