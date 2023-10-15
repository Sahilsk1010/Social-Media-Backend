const express = require('express');
const router = express.Router();
const {getcomments,addcomment,deletecomm} = require('../controllers/comment');
const { add } = require('lodash');
router.get("/",getcomments)
router.post("/",addcomment)
router.delete("/:id",deletecomm);
module.exports = router;