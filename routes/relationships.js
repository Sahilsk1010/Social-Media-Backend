const express = require('express');
const router = express.Router();

const {getallrelationship,addfollowing,deleterelationship} = require('../controllers/relationships');

router.get("/relationship/:id",getallrelationship);
router.post("/addfoll",addfollowing);
router.delete("/del",deleterelationship);

module.exports = router;