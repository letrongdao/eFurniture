const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "new_schema_1"
})

app.get('/users', (req,res) => {
    const query = "SELECT * FROM users"
    db.query(query, (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8081, () => {
    console.log("Listening...")
})