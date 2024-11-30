const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');


// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET route
app.get('/products', function (req, res) {
  db.query('SELECT * FROM products', function (error, results) {
      if (error) throw error;

      // Send the array directly
      return res.json(results);
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


  
  const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mypassword',
  database: 'bright_store'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
  