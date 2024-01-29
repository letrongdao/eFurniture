import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()
const env = dotenv.config()

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

app.post('/users', (req, res) => {
  const sql = "INSERT INTO `efurniture`.`users` (`user_id`, `username`, `password`, `role_id`, `fullName`, `phone_numbers`, `email`, `create_at`, `status`) VALUES (?,?,?,?,?,?,?,?,?)"
  const values = [req.body.id, req.body.username, req.body.password, "US", req.body.fullName, "", req.body.email, req.body.createDate, true]
  db.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }

    console.log(result);
    console.log(fields);
  })
})

app.listen(3344, () => {
  console.log("Listening to port 3344")
})

