var express = require('express');
var router = express.Router();

const { postCheckin, getCheckinToday } = require('../controllers/checkin.contoller')

router.post('/', postCheckin);
router.get('/get/checkintoday/:id', getCheckinToday);

module.exports = router;