const express = require('express');
const router = express.Router();
const {getlikes,addlike,dislike} = require('../controllers/like');

router.get("/like",getlikes);
router.post("/like",addlike);

router.delete("/like",dislike)

module.exports = router;