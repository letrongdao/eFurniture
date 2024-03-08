import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import querystring from 'qs';
import crypto from 'crypto';
import dateFormat from './src/assistants/date.format.js';
import moment from 'moment';

const app = express()
const env = dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your website
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow GET, POST, PATCH, DELETE methods
  credentials: true // Allow sending cookies with the request
}));

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
  const sql = "SELECT * FROM products ORDER BY status DESC";
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

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
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
  const sql = "SELECT * FROM products WHERE status = 1 ORDER BY RAND() LIMIT 20";
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

app.get('/cartItems/:userId', (req, res) => {
  const userId = req.params.userId
  const sql = "SELECT * FROM cartItems WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

app.patch('/cartItems/:cartItemId', (req, res) => {
  const cartItemId = req.params.cartItemId
  const sql = "UPDATE cartitems SET quantity = ? WHERE cartItem_id = ?";
  db.query(sql, [req.body.quantity, cartItemId], (err, result) => {
    if (err) console.log(err.message)
    return res.json(result)
  })
})

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


function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

app.post('/create_payment_url', function (req, res, next) {

  var ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  var tmnCode = 'P10RAQ3B';
  var secretKey = 'PBRPLJFXKZPGWWBCRSYJFQLDQHOQNUQI';
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = 'http://localhost:5173/paymentTransform';

  var date = new Date();

  var createDate = dateFormat(date, 'yyyymmddHHmmss');
  var orderId = dateFormat(date, 'HHmmss');
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;

  console.log("Request", req.body);
  var expireDate = moment(date).add(10, "minutes").format("YYYYMMDDHHmmss");
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  var currCode = 'VND';

  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_ExpireDate'] = expireDate;

  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  res.json({ vnpUrl: vnpUrl });
});
// Vui lòng tham khảo thêm tại code demo


app.get('/vnpay_ipn', function (req, res, next) {
  var vnp_Params = req.query;
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  var secretKey = 'PBRPLJFXKZPGWWBCRSYJFQLDQHOQNUQI';
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");


  if (secureHash === signed) {
    var orderId = vnp_Params['vnp_TxnRef'];
    var rspCode = vnp_Params['vnp_ResponseCode'];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: '00', Message: 'success' })
  }
  else {
    res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
  }
});


app.get('/vnpay_return', function (req, res, next) {
  var vnp_Params = req.query;

  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = 'P10RAQ3B';
  var secretKey = 'PBRPLJFXKZPGWWBCRSYJFQLDQHOQNUQI';

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
  } else {
    res.render('success', { code: '97' })
  } s
});


app.listen(3344, () => {
  console.log("Listening to port 3344");
})
