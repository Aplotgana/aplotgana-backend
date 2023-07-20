const express = require('express')
const { postRekanan } = require('../controllers/collaborator.controller')
const router = express.Router()


router.post('/', postRekanan)

module.exports = router