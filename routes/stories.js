const express = require('express');
const router = express.Router();
const {getstories,addstories,deletestories} = require('../controllers/stories.js');

router.get("/",getstories);
router.post("/",addstories);
router.delete("/:id",deletestories);

module.exports = router;