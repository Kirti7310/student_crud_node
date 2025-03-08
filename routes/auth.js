const express = require('express');
const router = express.Router();
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const db = require('../db')
const { Cookie } = require('express-session');

router.get('/login',(req,resp)=>
{
  resp.render('login');
});

router.post('/login',(req,resp)=>
{
  const {email,password}=req.body;
  db.query('SELECT * from users WHERE email = ?',[email],(err,results)=>
  {
    if(err) throw err;
    if(results.length === 0)return resp.send("user not found");
    bcrypt.compare(password,results[0].password,(err,results)=>
    {
      if(match)
      {
        const token = jwt.sign({id:results[0].id},process.env.JWT_SECRET,{expiresIn:'1h'});
        resp.cookie('token',token);
        resp.redirect('/student');
      }
      else
      {
        resp.send('Invlaud password!');
      }
    });
  });

});


router.get('/register',(req,resp)=>
{
  resp.render('register');
});


router.post('/register',(req,res)=>
{
  const{email,password}=req.body;
  bcrypt.hash(password,10,(err,hash)=>
  {
    db.query('Insert into users(email,password) values(?,?)',[email,hash],(err,results)=>
    {
      if(err) throw err;
      res.redirect('/login');

    });
  });
});

module.exports = router;