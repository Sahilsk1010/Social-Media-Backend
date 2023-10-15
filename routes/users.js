const express = require('express');
const router = express.Router();
const {getuser,updateuser} = require('../controllers/user');


router.get("/:id",getuser);
router.put("/:id",updateuser);
module.exports = router;