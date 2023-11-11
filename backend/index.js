
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const Jwt =require('jsonwebtoken');
const cookieParser = require("cookie-parser");

app.use(express.static('Public'))

app.use(cors({
    origin: "http://localhost:3004", // Allows requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'employeems'
})

// register

app.post("/signup", (req, res) => {
    const sql = 'INSERT INTO adminlogin (`username`,`email`, `password`) VALUES (?)';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        return res.json(data);
    })
})

//login 

app.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = Jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
})


// add Category 

app.post('/add_category', (req, res) => {
    const sql = 'INSERT INTO category (`name`) VALUES (?)'
    db.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})


// get Categories 

app.get('/category', (req, res) => {
    const sql = 'SELECT * FROM category'
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })

    })
});

// Image Upload 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))

    }
})

const upload = multer({
    storage: storage
})

// End Image Upload

//Add Employee

app.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, address, salary,contact,doj, image, category_id) VALUES (?)`
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err) // Log the error
            return res.json({ Status: false, Error: "Query Error" })
        }
        const values = [
            req.body.name,
            req.body.email,
            hashedPassword,
            req.body.address,
            req.body.salary,
            req.body.contact,
            req.body.doj,
            req.file.filename,
            req.body.category_id
        ]

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(err) //Log the error
                return res.json({ Status: false, Error: "Query Error" })
            }
            return res.json({ Status: true })
        })
    })
})


// Get Employee Data

app.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err) //Log the error
            return res.json({ Status: false, Error: "Query Error" })
        }
        return res.json({ Status: true, Result: result })
    })
})


// Get Employee Data based on Employee Id

app.get('/employee/:id', (req, res) => {
    const id = req.params.id; // Parse the ID into an integer
    // console.log(id);
    const sql = "SELECT * FROM employee WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ Status: false, Error: "Internal Server Error" });
        } else {
            return res.json({ Status: true, Result: result });
        }
    });
});

// Update Employee Data

app.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

// Delete Employee Data from Database

app.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
            return res.json({ Status: false, Error: "Query Error" + err })
        }
        return res.json({ Status: true, Result: result })
    })
})

// 

app.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from adminlogin";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.get('/admin_records', (req, res) => {
    const sql = "select * from adminlogin"
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})



// Employee Login and Registration 

//login 

app.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    db.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = Jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "employee_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
})

app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  });



// Verify  


const verifyUser = (req, res, next) => {
    
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
})




// checking whether database is connected

db.connect(function (err) {
    if (err) {
        console.error("connection error");
    }
    else {
        console.log("connected");
    }
})

// Listening on Port 3007

app.listen(3007, () => {
    console.log("App listening on 3007")
})

