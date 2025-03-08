const express = require("express");
const mysql = require("mysql2");
const jwt = require("dotenv");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path=require("path");
const db = require('./db');
const app= express();

// dotenv.config();


//DB CONNECTIION
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect(err=>
//   {
//     if(err) throw err;
//     console.log("connection successfull!");

//   }
// );

//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(session({secret:'secret',resave:true,saveUninitialized:true}));



//route
const authRoutes = require('./routes/auth');
const studentroutes = require('./routes/students');

app.use('/auth',authRoutes);
app.use('/students',studentroutes);





const port =process.env.PORT;

app.listen(port,(err)=>
{
  console.log("Server is running!");
});






