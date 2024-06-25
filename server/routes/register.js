const express = require('express');
const router = express.Router();
const Register = require('../models/Register')
const adminLayout = '../views/layouts/register';
const bcrypt = require('bcrypt');


/**
 * GET /
 * Admin - Register Page
*/

// router.get('/register', async (req, res) => {
//   try {
//     const locals = {
//       title: "Register",
//       description: "Blog created with NodeJs, Express & MongoDb."
//     }

//     res.render('register/index', { locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error);
//   }
// });



router.get('/register', (req, res) => {
  res.render('register/index');
  // res.redirect('/admin');
});


/**
 * POST /
 * Admin - Register
*/

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await Register.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'User already in Registered' });
      }
      res.status(500).json({ message: 'Internal server error' })
    }
    
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;