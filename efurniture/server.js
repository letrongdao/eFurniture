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

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = "SELECT * FROM products WHERE product_id = ?";
  db.query(sql, [productId], (err, result) => {
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

app.patch('/products/:id', (req, res) => {
  const productId = req.params.id;
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
  db.query(sql, [productId], (err, result) => {
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

app.get('/products/category/:name', (req, res) => {
  const name = req.params.name
  const sql = "SELECT * FROM products WHERE category_name = ?";
  db.query(sql, [name], (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/topProducts', (req, res) => {
  const sql = "SELECT * FROM products WHERE status = 1 ORDER BY RAND() LIMIT 12";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/productsOfTheWeek', (req, res) => {
  const sql = "SELECT * FROM products WHERE status = 1 ORDER BY RAND() LIMIT 3";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/inventoryItems', (req, res) => {
  const sql = "SELECT * FROM inventoryitems";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})


app.get('/categories', (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/carts/:userId', (req, res) => {
  const userId = req.params.userId
  const sql = "SELECT * FROM carts WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.get('/cartItems/:cartId', (req, res) => {
  const cartId = req.params.cartId
  const sql = "SELECT * FROM cartItems WHERE cart_id = ?";
  db.query(sql, [cartId], (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

//POST add to cart_items with user_id, product_id, quantity
app.post('/cart', (req, res) => {
  const sql = "INSERT INTO cartItems SET ?";
  const newCartItem = req.body;
  db.query(sql, newCartItem, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: 'failed' });
    } else {
      newCartItem.id = result.insertId;
      res.status(201).json(newCartItem);
    }
  });
});

//DELETE delete from cart_items with user_id, product_id
app.delete('/cart', (req, res) => {
  const sql = "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?";
  const data = [req.query.user_id, req.query.product_id];
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ message: 'Cart deleted!' });
    }
  });
});

//GET all cart_items with user_id and join with products to get name, price, image_url
app.get('/cart', (req, res) => {
  const sql = "SELECT c.*, p.name, p.price, p.image_url FROM cart_items c JOIN products p ON c.product_id = p.product_id WHERE c.user_id = ?";
  db.query(sql, req.query.user_id, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(result);
    }
  });
});

//UPDATE cart_items with user_id, product_id, quantity
app.patch('/cart', (req, res) => {
  const sql = "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?";
  const data = [req.body.quantity, req.body.user_id, req.body.product_id];
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ message: 'Cart updated successfully' });
    }
  });
});

//POST create a new booking with user_id, product_id, date, time, content, status, booking_id
app.post('/bookings', (req, res) => {
  const sql = "INSERT INTO bookings SET ?";
  const newBooking = req.body;
  if (newBooking.status === undefined) {
    newBooking.status = 0;
  }
  // if (newBooking.user_id === undefined) {
  //   newBooking.user_id = 'us1231123129131';
  // }
  db.query(sql, newBooking, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: 'failed' });
    } else {
      newBooking.booking_id = result.insertId;
      res.status(201).json(newBooking);
    }
  });
});


//PATCH update a booking with booking_id
app.patch('/bookings/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE bookings SET ? WHERE booking_id = ?";
  const data = [req.body, id];
  console.log(data);
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ message: 'Cart updated successfully' });
    }
  });
});

//DELETE delete a booking with booking_id
app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM bookings WHERE booking_id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ message: 'Cart deleted!' });
    }
  });
});

//GET get all bookings
app.get('/bookings', (req, res) => {
  const sql = "SELECT * FROM bookings";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(result);
    }
  });
});

app.listen(3344, () => {
  console.log("Listening to port 3344")
})

