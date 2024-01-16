import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

var app = express();
app.listen(3344,function(){
    console.log('Node server running @ http://localhost:3344')
});

var env = dotenv.config();

var con = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });

  
con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM movie";
    con.query(sql, function(err, results) {
      if (err) throw err;
      console.log(results);
    })
  });
  