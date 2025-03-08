const express = require('express');
const router = express.Router();
const db = require('../db');
const { route } = require('./auth');


router.get('/',(req,resp)=>
{
  db.query("select * from students",(err,results)=>
  {
    if(err) throw err;
    resp.render('students',{students:results});
  });
});


router.post('/add', (req, res) => {
  const { name, age } = req.body;
  db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (err, results) => {
    if (err) throw err;
    res.redirect('/students');
  });
});

router.post('/delete/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.redirect('/students');
  });
});

router.post('/update/:id',(req,resp)=>
{
  const {name ,age} = req.body;
  db.query('UPDATE students SET name = ?, age = ? WHERE id = ?', [name, age, req.params.id], (err, results) => {
    
  if(err) throw err;
  resp.redirect('/students');
  
})

});

module.exports =router;