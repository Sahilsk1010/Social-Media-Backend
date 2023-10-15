// const express = require('express');
// const register = require('../controllers/auth.js');
// const { route } = require('./users.js');
// const router = express.Router();
// router.post("/register",register);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {register,login,logout} = require('../controllers/auth.js');


router.post('/register', register);
router.post('/login',login);
router.post("/logout",logout);
module.exports = router;

