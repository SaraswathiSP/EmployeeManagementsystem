const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'signup'
})

// register

app.post("/signup",(req,res) =>{
    const sql = 'INSERT INTO login (`username`,`email`, `password`) VALUES (?)';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]

    db.query(sql,[values],(err,data) =>{
        if (err){
            return res.json("Error")
        }
        return res.json(data);
    })
})

//login 

app.post("/login",(req,res) =>{
    const sql = 'SELECT * FROM login WHERE `email`= ? AND `password`= ?'
    

    db.query(sql,[req.body.email,req.body.password],(err,data) =>{
        if (err){
            return res.json("Error")
        }
        if (data.length >0){
            return res.json("Success");
        }else{
            return res.json("Fail");
        }
    })
})

app.listen(3007, ()=>{
    
console.log("App listening on 3007")
})