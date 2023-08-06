const express = require('express')
const { postLocationRecord, getLocationRecord } = require('../controllers/location.controller')
const router = express.Router()

router.post('/', postLocationRecord)
router.get('/:checkinId', getLocationRecord)

module.exports = router