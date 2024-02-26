import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()
const env = dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
})

app.get('/', (req, res) => {
  return res.json("From backend side")
})

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, data) => {
    if (err) res.json(err)
    return res.json(data)
  })
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM users WHERE user_id = ?`
  db.query(sql, id, (err, result) => {
    if (err) res.json(err)
    return res.json(result)
  })
})

app.post('/users', async (req, res) => {
  const sql = "INSERT INTO users (user_id, email, password, fullName, role_id, phone, create_at, status) VALUES (?,?,?,?,?,?,?,?)"
  const values = [req.body.user_id, req.body.email, req.body.password, req.body.fullName, req.body.role_id, req.body.phone, req.body.create_at, req.body.status]
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      return;
    } else {
      console.log("Successfully registered")
    }
  })
})

app.patch('/users/:id', async (req, res) => {
  const id = req.params.id
  const sql = "UPDATE users SET password = ? WHERE user_id = ?"
  const data = [req.body.password, id]
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.message)
      return;
    } else {
      console.log("Password has been successfully reset.")
    }
  })
})

app.get('/products', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/products', (req, res) => {
  const productId = [req.query.product_id];
  const sql = "SELECT * FROM products WHERE product_id = ?";

  db.query(sql, productId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result[0]);
    }
  });
})


app.post('/products', (req, res) => {
  const sql = "INSERT INTO products SET ?";
  const newProduct = [req.body];
  db.query(sql, newProduct, (err, result) => {
    if (err) {
      console.log(err)
      return;
    } else {
      newProduct.id = result.insertId;
      res.status(201).json(newProduct);
    }
  })
})

app.put('/products', (req, res) => {
  const productId = req.query.product_id;
  const updatedProduct = req.body;

  const sql = "UPDATE products SET ? WHERE product_id = ?";

  db.query(sql, [updatedProduct, productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  });
})

app.delete('/products', (req, res) => {
  const productId = [req.query.product_id];
  const sql = "DELETE FROM products WHERE product_id = ?";
  db.query(sql, productId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else if (result.affectedRows === 0) {
      res.status(404).json({ err: 'Product not found!' });
    } else {
      res.json({ message: 'Product deleted!' });
    }
  });
})

app.get('/inventoryItems', (req, res) => {
  const sql = "SELECT * FROM inventoryitems";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.listen(3344, () => {
  console.log("Listening to port 3344")
})

