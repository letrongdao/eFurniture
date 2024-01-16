import express from 'express';
import mysql2 from 'mysql2';

var app = express();
app.listen(3344,function(){
    console.log('Node server running @ http://localhost:3344')
});

var con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "sa@12345",
    database: "webmovie"
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
  