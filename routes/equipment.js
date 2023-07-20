const express = require('express')
const { postEquipment } = require('../controllers/equipment.controller')
const router = express.Router()

router.post('/', postEquipment)

module.exports = router