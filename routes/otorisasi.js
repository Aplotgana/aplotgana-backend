const express = require('express')
const router = express.Router()

const otorisasi = require('../controllers/otorisasi.controller')

router.post('/:checkinid/:inboxUserId/:inboxAdminId', otorisasi.postOtorisasiToInboxAdmin)
router.post('/:checkinid/:userId', otorisasi.postNewOtorisasi)
router.post('/post/:checkinid/:inboxUserId/:inboxAdminId', otorisasi.postOtorisasi)

module.exports = router