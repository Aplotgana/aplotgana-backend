var express = require('express');
var router = express.Router();

const { postCheckin, getCheckinToday, postCheckout } = require('../controllers/checkin.contoller')

router.post('/', postCheckin);
router.get('/get/checkintoday/:id', getCheckinToday);
router.post('/:id', postCheckout);

module.exports = router;