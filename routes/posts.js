const express = require('express');
const router = express.Router();
const {getposts,addposts,deleteposts} = require('../controllers/post.js');




router.get("/post",getposts);
router.post("/create",addposts);
router.delete("/delete",deleteposts);

module.exports = router;